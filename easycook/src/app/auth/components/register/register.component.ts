import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthenticationService,
  TokenPayload,
} from 'src/app/auth/services/authentication.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { confirmEqualValidator } from './validators/confirm-equal.validator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    username: '',
    password: '',
  };

  loading = false;
  requestError = String;
  showRequestError = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      email: this.emailForm,
      loginInfo: this.loginInfoForm,
    });
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group(
      {
        email: this.emailCtrl,
        confirm: this.confirmEmailCtrl,
      },
      {
        validators: [confirmEqualValidator('email', 'confirm')],
        //updateOn: 'blur',
      }
    );
    this.passwordCtrl = this.formBuilder.control('', [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'),
    ]);
    this.confirmPasswordCtrl = this.formBuilder.control(
      '',
      Validators.required
    );

    this.loginInfoForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl,
      },
      {
        validators: [confirmEqualValidator('password', 'confirmPassword')],
      }
    );
  }

  private initFormObservables() {
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.emailCtrl.value &&
          this.confirmEmailCtrl.value
      )
    );
    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.passwordCtrl.value &&
          this.confirmPasswordCtrl.value
      )
    );
  }

  onSubmitForm() {
    const formData = this.mainForm.value;
    const json = {
      username: formData.loginInfo.username,
      password: formData.loginInfo.password,
      firstName: formData.personalInfo.firstName,
      lastName: formData.personalInfo.lastName,
      email: formData.email.email,
    };
    this.loading = true;
    this.auth
      .register(json)
      .pipe(
        tap(
          (saved) => {
            this.loading = false;
            if (saved) {
              //this.resetForm();
              this.router.navigateByUrl('/auth/login');
              this.showSuccess();
            }
          },
          (err) => {
            this.loading = false;
            this.showRequestError = true;
            this.requestError = err.error.error;
          }
        )
      )
      .subscribe();
  }

  showSuccess() {
    this.toast.success('Inscription effectuée', 'Succès', {
      timeOut: 3000,
      toastClass: 'toast-custom',
    });
  }

  private resetForm() {
    this.mainForm.reset();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('pattern')) {
      return 'Le mot de passe ne répond pas aux critères';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
}
