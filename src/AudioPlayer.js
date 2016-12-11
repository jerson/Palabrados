import Config from './Config'
import {soundManager} from 'soundmanager2'
import 'soundmanager2/swf/soundmanager2.swf'
import audioBackground from './audio/background.mp3'
import audioFail from './audio/fail.mp3'
import audioWin from './audio/win.mp3'
import audioSuccess from './audio/success.mp3'

export default class AudioPlayer {

    static background;
    static success;
    static fail;
    static win;

    static loadSounds() {

        // createjs.Sound.registerSound(audioBackground, 'background');
        // createjs.Sound.registerSound(audioFail, 'fault');
        // createjs.Sound.registerSound(audioSuccess, 'success');
        // createjs.Sound.registerSound(audioWin, 'win');

        AudioPlayer.background = soundManager.createSound({
            id: `background`,
            url: audioBackground,
            autoLoad: true,
            volume: 10,
            onfinish: () => {

            }
        });
        AudioPlayer.success = soundManager.createSound({
            id: `success`,
            url: audioSuccess,
            autoLoad: true,
            volume: 100,
            onfinish: () => {

            }
        });
        AudioPlayer.win = soundManager.createSound({
            id: `win`,
            url: audioWin,
            autoLoad: true,
            volume: 100,
            onfinish: () => {

            }
        });
        AudioPlayer.fail = soundManager.createSound({
            id: `fail`,
            url: audioFail,
            autoLoad: true,
            volume: 100,
            onfinish: () => {

            }
        });
    }

    static init():Promise {

        return new Promise((resolve, reject) => {
            soundManager.setup({
                url: '/swf/',
                forceUseGlobalHTML5Audio: true,
                debugMode: Config.app.debug,
                debugFlash: Config.app.debug,
                consoleOnly: Config.app.debug,
                useFlashBlock: false,
                flashVersion: 8, // optional: shiny features (default = 8)
                // optional: ignore Flash where possible, use 100% HTML5 mode
                preferFlash: false,
                useHTML5Audio: true,
                noSWFCache: true,
                allowScriptAccess: 'sameDomain',
                ignoreMobileRestrictions: false,
                html5Test: /^(probably|maybe)$/i,
                onready: () => {

                    this.loadSounds();
                    resolve();
                },
                ontimeout: () => {
                    console.log('SM2 init failed!');
                },
                defaultOptions: {
                    // set global default volume for all sound objects
                    volume: 100
                }
            });
        })

    }

}
