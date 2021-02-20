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
    export enum ButtonState {
        //% block=Released
        Released = 0,
        //% block=Pressed
        Pressed = 1
    }
        
    /**
     * YB-EMH02 ver 1.2 remote buttons
     */
    export enum YBRemoteButton {
        //% block=JoystickZ
        JoystickZ = 8,
        //% block=B1Red
        B1Red = 13,
        //% block=B2Green
        B2Green = 14,
        //% block=B3Blue
        B3Blue = 15,
        //% block=B4Yellow
        B4Yellow = 16
    }

    /**
     * Initialize for Yahboom remote
     */
    //% block="Initialize Yahboom remote"
    //% blockId="ux_initializeYahboomRemote"
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
        uxMotion.initializePhaseWidthModulationDriver()
        initializedYBRemote = true
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="Yahboom remote X (-1=left to 1=right)"
    //% blockId="ux_joystickX"
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
    //% block="Yahboom remote Y (-1=down to 1=up)"
    //% blockId="ux_joystickY"
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
    //% block="On Yahboom remote|button %button|state %state"
    //% blockId="ux_onYahboomRemoteButton"
    //% group="Yahboom"
    //% weight=96
    export function onYahboomRemoteButton(button: YBRemoteButton, state: ButtonState, body: Action): void {
        
        let pulseValue: PulseValue = PulseValue.Low
        if (state == ButtonState.Released)
            pulseValue = PulseValue.High
        
        let pin: DigitalPin = DigitalPin.P8
        switch (button) {
            case YBRemoteButton.B1Red:
                pin = DigitalPin.P13
                break
            case YBRemoteButton.B2Green:
                pin = DigitalPin.P14
                break
            case YBRemoteButton.B3Blue:
                pin = DigitalPin.P15
                break
            case YBRemoteButton.B4Yellow:
                pin = DigitalPin.P16
                break
            default:
                // Assume JoystickZ ==> DigitalPin.P8
                break
        }

        pins.onPulsed(pin, pulseValue, body)
    }

    /**
     * Set Yahboom remote vibration speed
     * @param speed [0...4095] pulse width in uSec
    */
    //% block="Yahboom remote vibration speed|speed %speed"
    //% blockId="ux_setYahboomRemoteVibrationSpeed"
    //% speed.min=0 speed.max=4095
    //% group="Yahboom"
    //% weight=95
    export function setYahboomRemoteVibrationSpeed(speed: number): void {
        uxMotion.initializePhaseWidthModulationDriverAdvanced(0x41)
        speed = ux.inRange(speed, 0, uxMotion.getPhaseWidthLevels()-1)
        uxMotion.setPwm(0, 0, speed)
    }
}
