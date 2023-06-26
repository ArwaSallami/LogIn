import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ContactService} from "../ApiServices/contact.service";
import {Contact} from "../Models/contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    captchaKey = '6LcQ6LcUAAAAAA-WHaQQzu9sTEVWPgo3w-re35G6';
    captchaSize = 'normal';
    public innerWidth: any;
    form;
    sucess_msg: string = null;
    error_msg: string = null;

    // To detect current window width
    ngOnInit() {
        this.innerWidth = window.innerWidth;
        // console.log(this.innerWidth);
        if (this.innerWidth < 575) {
            this.captchaSize = 'compact';
        } else {
            this.captchaSize = 'normal';
        }
    }
    // To detect current window width on resize
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.innerWidth = window.innerWidth;
        // console.log(this.innerWidth);
        if (this.innerWidth < 575) {
            this.captchaSize = 'compact';
        } else {
            this.captchaSize = 'normal';
        }
    }
    constructor(fb: FormBuilder, private contactservice: ContactService) {
       this.form = fb.group({
            email: ['', [
                Validators.required, Validators.email
            ]],
            subject: ['', [
                Validators.required, Validators.minLength(3)
            ]],
            message: ['', [
                Validators.required, Validators.minLength(10)
            ]]
         //,           recaptcha: ['', Validators.required]
        });
  }
    get email() {
        return this.form.get('email');
    }
    get subject() {
        return this.form.get('subject');
    }
    get message() {
        return this.form.get('message');
    }
    sendContact() {
        if (this.form.valid) {
            // console.log(this.form.value);
            this.contactservice.getConfig();
                this.contactservice.sendContact(this.form.value)
                    .subscribe(
                    (resp: Contact) => {
                        // console.log(resp);
                        this.form.reset();
                        this.sucess_msg = 'Votre mail est envoyé avec succès !';
                    },
                    (error: Response) => {
                            // console.log(error);
                        this.error_msg = 'Une erreur est survenue! essayez plus tard.';
                    }
                );
        }
        else {
            this.form.setErrors({
                         invalidForm: true
                     });
            console.log('not valid');
        }
    }
}
