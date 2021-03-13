/**
 * microX, support for remotes
 */
//% block=uxRemotes
//% color="#303030" weight=49 icon="\uf11b"
//% groups='["Yahboom"]'
namespace uxRemotes {

    let initializedYBRemote = false
    
    /**
     * Button state
     */
    export enum BUTTON_STATE {
        //% block="released"
        RELEASED = 0,
        //% block="pressed"
        PRESSED = 1
    }
        
    /**
     * YB-EMH02 ver 1.2 remote buttons
     */
    export enum YB_REMOTE_BUTTON {
        //% block="joystick z"
        JOYSTICK_Z = 8,
        //% block="b1 red"
        B1_RED = 13,
        //% block="b2 green"
        B2_GREENGreen = 14,
        //% block="b3 blue"
        B3_BLUE = 15,
        //% block="b4 yellow"
        B4_YELLOW = 16
    }

    // function initializeYahboomRemotePhaseWidthModulationDriver(): void {
    //     uxMotion.initializePhaseWidthModulationDriverAdvanced(0x41)
    // }

    /**
     * Initialize for Yahboom remote
     */
    //% block="initialize yahboom remote"
    //% blockId="uxRemotes_initializeYahboomRemote"
    //% group="Yahboom"
    //% weight=99
    export function initializeYahboomRemote(): void {
        if (initializedYBRemote)
            return
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
        // initializeYahboomRemotePhaseWidthModulationDriver()
        initializedYBRemote = true
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="yahboom remote x (-1=left to 1=right)"
    //% blockId="uxRemotes_joystickX"
    //% group="Yahboom"
    //% weight=98
    export function joystickX(): number {
        
        // Normalize from [0,1023] to [-512,511]
        let readValue = 512 - pins.analogReadPin(AnalogPin.P2)
        
        // Ignore values between -25 and 25 since joystick may not be calibrated (mine had an X-offset of 1)
        if (-25 < readValue && readValue < 25)
            readValue = 0
        
        // Normalize from -512..511 to -1.0 ... 1.0
        return readValue / 512.0
    }

    /**
     * Get Y-axis value of YB-EMH02 ver 1.2 joystick (port1) between -1 (bottom) and 1 (top)
     */
    //% block="yahboom remote y (-1=down to 1=up)"
    //% blockId="uxRemotes_joystickY"
    //% group="Yahboom"
    //% weight=97
    export function joystickY() {
        
        // Normalize from [0,1023] to [-512,511]
        let readValue = 512 - pins.analogReadPin(AnalogPin.P1)
        
        // Ignore values between -25 and 25 since joystick may not be calibrated (mine had a Y-offset of 12)
        if (-25 < readValue && readValue < 25)
            readValue = 0
        
        // Normalize from -512..511 to -1.0 ... 1.0
        return readValue / 512.0
    }

    /**
     * Act on YB-EMH02 ver 1.2 remote button click (Click on Joystick (Z), B1, B2, B3, B4)
     */
    //% block="on yahboom remote|button %button|state %state"
    //% blockId="uxRemotes_onYahboomRemoteButton"
    //% group="Yahboom"
    //% weight=96
    export function onYahboomRemoteButton(button: YB_REMOTE_BUTTON, state: BUTTON_STATE, body: Action): void {
        
        let pulseValue: PulseValue = PulseValue.Low
        if (state == BUTTON_STATE.RELEASED)
            pulseValue = PulseValue.High
        
        let pin: DigitalPin = DigitalPin.P8
        switch (button) {
            case YB_REMOTE_BUTTON.B1_RED:
                pin = DigitalPin.P13
                break
            case YB_REMOTE_BUTTON.B2_GREENGreen:
                pin = DigitalPin.P14
                break
            case YB_REMOTE_BUTTON.B3_BLUE:
                pin = DigitalPin.P15
                break
            case YB_REMOTE_BUTTON.B4_YELLOW:
                pin = DigitalPin.P16
                break
            default:
                // Assume JoystickZ ==> DigitalPin.P8
                break
        }

        pins.onPulsed(pin, pulseValue, body)
    }

    // /**
    //  * Set Yahboom remote vibration speed
    //  * @param speed [0...4095] pulse width in uSec
    // */
    // //% block="yahboom remote vibration speed|speed %speed"
    // //% blockId="uxRemotes_setYahboomRemoteVibrationSpeed"
    // //% speed.min=0 speed.max=4095
    // //% group="Yahboom"
    // //% weight=95
    // export function setYahboomRemoteVibrationSpeed(speed: number): void {
    //     initializeYahboomRemotePhaseWidthModulationDriver()
    //     speed = ux.inRange(speed, 0, uxMotion.getPhaseWidthLevels()-1)
    //     uxMotion.setPwm(0, 0, speed)
    // }
}
