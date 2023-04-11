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
import { Observable, map } from 'rxjs';
import { confirmEqualValidator } from './validators/confirm-equal.validator';
import { validValidator } from './validators/valid.validator';
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
    private formBuilder: FormBuilder //private complexFormService: ComplexFormService
  ) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        console.error(err.error);
      }
    );
  }
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
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
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
  }

  private setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email,
        validValidator(),
      ]);
    } else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }

  onSubmitForm() {
    console.log(this.mainForm.value);
    const formData = this.mainForm.value;
    const json = {
      username: formData.loginInfo.username,
      password: formData.loginInfo.password,
      firstName: formData.personalInfo.firstName,
      lastName: formData.personalInfo.lastName,
      email: formData.email.email,
    };
    console.log(json);
    // this.loading = true;
    // this.complexFormService
    //   .saveUserInfo(this.mainForm.value)
    //   .pipe(
    //     tap((saved) => {
    //       this.loading = false;
    //       if (saved) {
    //         this.resetForm();
    //       } else {
    //         console.error("Échec de l'enregistrement");
    //       }
    //     })
    //   )
    //   .subscribe();
  }

  private resetForm() {
    this.mainForm.reset();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('validValidator')) {
      return 'Cette adresse est incorrecte';
    } else {
      return 'Ce champ contient une erreur';
    }
  }
}
