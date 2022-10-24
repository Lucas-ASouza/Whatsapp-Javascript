import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { DocumentPreviewController } from './DocumentPreviewController';
import { MicrophoneController } from './MicrophoneController';
import { Firebase } from './../util/Firebase';
import { User } from './../model/User';
import { Chat } from './../model/Chat';
import { Message } from '../model/Message';
import { Base64 } from '../util/Base64';
import { ContactsController } from './ContactsController';

export class WhatsAppController {

    constructor() {

        this._active = true;
        this._locale = 'pt-BR';
        this._firebase = new Firebase();

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
        this.initAuth();
        this.checkNotifications();

    }

    checkNotifications() {

        if (typeof Notification === 'function') {

            if (Notification.permission !== 'granted') {

                this.el.alertNotificationPermission.show();



            } else {

                this.el.alertNotificationPermission.hide();

            }

            this.el.alertNotificationPermission.on('click', e => {

                Notification.requestPermission(permission => {

                    if (permission === "granted") {
                        this.el.alertNotificationPermission.hide();
                        console.info('Notificações permitidas!');
                    }

                });

            });

        }

    }