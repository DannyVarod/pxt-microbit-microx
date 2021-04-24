/**
 * microX, support for remotes
 */
//% block=uxRemotes
//% color="#303030" weight=49 icon="\uf11b"
//% groups='["Initialize", "Joystick", "Buttons"]'
namespace uxRemotes {

    let initializedRemote = false
    let joystickYPin: ux.PIN_NUMBER = ux.PIN_NUMBER.AnalogPin1
    let joystickXPin: ux.PIN_NUMBER = ux.PIN_NUMBER.AnalogPin2
    let feedbackPin: ux.PIN_NUMBER = -1
    let joystickDirectionY: number = 1
    let joystickDirectionX: number = 1
    let joystickZeroDelta: number = 20

    /**
     * Initialize joystick
     */
    //% block="initialize remote"
    //% blockId="uxRemotes_initializeJoystick"
    //% advanced=true
    //% weight=99
    export function initializeJoystick(xPin: ux.PIN_NUMBER, yPin: ux.PIN_NUMBER): void {
        joystickYPin = yPin
        joystickXPin = xPin
    }

    /**
     * Initialize button pull up
     */
    //% block="initialize button"
    //% blockId="uxRemotes_initializeButtonPullUp"
    //% advanced=true
    //% weight=98
    export function initializeButtonPullUp(buttonPin: ux.PIN_NUMBER): void {
        pins.setPull(ux.pinToDigitalPin(buttonPin), PinPullMode.PullUp)
    }

    /**
     * Initialize button pull down
     */
    //% block="initialize button"
    //% blockId="uxRemotes_initializeButtonPullDown"
    //% advanced=true
    //% weight=98
    export function initializeButtonPullDown(buttonPin: ux.PIN_NUMBER): void {
        pins.setPull(ux.pinToDigitalPin(buttonPin), PinPullMode.PullDown)
    }

    /**
     * Initialize button pull none
     */
    //% block="initialize button"
    //% blockId="uxRemotes_initializeButtonPullNone"
    //% advanced=true
    //% weight=98
    export function initializeButtonPullNone(buttonPin: ux.PIN_NUMBER): void {
        pins.setPull(ux.pinToDigitalPin(buttonPin), PinPullMode.PullNone)
    }
    
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
    export enum REMOTE_BUTTON {
        //% block="pin 0"
        PIN0 = 0,
        //% block="pin 1"
        PIN1 = 1,
        //% block="pin 2"
        PIN2 = 2,
        //% block="pin 3"
        PIN3 = 3,
        //% block="pin 4"
        PIN4 = 4,
        //% block="pin 6"
        PIN6 = 6,
        //% block="pin 7"
        PIN7 = 7,
        //% block="pin 8"
        PIN8 = 8,
        //% block="pin 9"
        PIN9 = 9,
        //% block="pin 10"
        PIN10 = 10,
        //% block="pin 12"
        PIN12 = 12,
        //% block="pin 13"
        PIN13 = 13,
        //% block="pin 14"
        PIN14 = 14,
        //% block="pin 15"
        PIN15 = 15,
        //% block="pin 16"
        PIN16 = 16,
        //% block="yahboom joystick z"
        YAHBOOM_JOYSTICK_Z = 8,
        //% block="yahboom b1 red"
        YAHBOOM_B1_RED = 13,
        //% block="yahboom b2 green"
        YAHBOOM_B2_GREEN = 14,
        //% block="yahboom b3 blue"
        YAHBOOM_B3_BLUE = 15,
        //% block="yahboom b4 yellow"
        YAHBOOM_B4_YELLOW = 16,
        //% block="ywrobot joystick z"
        YWROBOT_JOYSTICK_Z = 16,
        //% block="ywrobot C green"
        YWROBOT_C_GREEN = 13,
        //% block="ywrobot D yellow"
        YWROBOT_D_YELLOW = 14,
    }

    /**
     * Initialize Yahboom remote
     */
    //% block="initialize Yahboom remote"
    //% blockId="uxRemotes_initializeYahboomRemote"
    //% group="Yahboom"
    //% weight=98
    export function initializeYahboomRemote(): void {
        if (initializedRemote)
            return
        initializeJoystick(ux.PIN_NUMBER.PIN2, ux.PIN_NUMBER.PIN1)
        joystickDirectionY = 1
        joystickDirectionX = 1
        joystickZeroDelta = 20
        initializeButtonPullNone(ux.PIN_NUMBER.PIN8)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN13)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN14)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN15)
        initializeButtonPullUp(ux.PIN_NUMBER.PIN16)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN0)
        feedbackPin = ux.PIN_NUMBER.PIN0
        initializedRemote = true
    }

    /**
     * Initialize Ywrobot remote
     */
    //% block="initialize Ywrobot remote"
    //% blockId="uxRemotes_initializeYwrobotRemote"
    //% group="Ywrobot"
    //% weight=98
    export function initializeYwrobotRemote(): void {
        if (initializedRemote)
            return
        initializeJoystick(ux.PIN_NUMBER.PIN1, ux.PIN_NUMBER.PIN2)
        // Y is inverse on board (-1 is up)
        joystickDirectionY = -1
        joystickDirectionX = 1
        joystickZeroDelta = 10
        initializeButtonPullNone(ux.PIN_NUMBER.PIN13)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN14)
        initializeButtonPullUp(ux.PIN_NUMBER.PIN16)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN8)
        initializeButtonPullNone(ux.PIN_NUMBER.PIN0)
        uxDisplays.intializeOnboardPixelsYwrobotRemote()
        feedbackPin = ux.PIN_NUMBER.PIN8
        initializedRemote = true
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="get remote x (-scale=left to scale=right)|scale %scale"
    //% blockId="uxRemotes_joystickX"
    //% scale.min=1 scale.max=4095 scale.defl=100
    //% group="Joystick"
    //% weight=98
    export function joystickX(scale: number = 1.0): number {
        
        // Normalize from [0,1023] to [-512,511]
        let readValue = 512 - pins.analogReadPin(ux.pinToAnalogPin(joystickXPin))
        
        // Ignore values between -delta and delta since joystick may not be calibrated
        if (-joystickZeroDelta < readValue && readValue < joystickZeroDelta)
            readValue = 0
        
        // Normalize from -512..511 to -scale...scale
        return readValue * joystickDirectionX * scale / 512.0
    }

    /**
     * Get Y-axis value of YB-EMH02 ver 1.2 joystick (port1) between -1 (bottom) and 1 (top)
     */
    //% block="get remote y (-scale=down to scale=up)|scale %scale"
    //% blockId="uxRemotes_joystickY"
    //% scale.min=1 scale.max=4095 scale.defl=100
    //% group="Joystick"
    //% weight=97
    export function joystickY(scale: number = 1.0): number {
        
        // Normalize from [0,1023] to [-512,511]
        let readValue = 512 - pins.analogReadPin(ux.pinToAnalogPin(joystickYPin))
        
        // Ignore values between -delta and delta since joystick may not be calibrated
        if (-joystickZeroDelta < readValue && readValue < joystickZeroDelta)
            readValue = 0
        
        // Normalize from -512..511 to -scale...scale
        return readValue * joystickDirectionY * scale / 512.0
    }

    /**
     * Act on remote button
     */
    //% block="on remote button|button %button|state %state"
    //% blockId="uxRemotes_onRemoteButton"
    //% group="Buttons"
    //% weight=96
    export function onRemoteButton(button: REMOTE_BUTTON, state: BUTTON_STATE, body: Action): void {
        
        let pulseValue: PulseValue = PulseValue.Low
        if (state == BUTTON_STATE.RELEASED)
            pulseValue = PulseValue.High
        
        let pin: DigitalPin = ux.pinToDigitalPin((button as number) as ux.PIN_NUMBER)
        pins.onPulsed(pin, pulseValue, body)
    }

    /**
     * Set remote vibration feedback level
     * @param level [0...1023]
    */
    //% block="set remote vibration feedback|level %level"
    //% blockId="uxRemotes_setRemoteVibrationFeedback"
    //% level.min=0 level.max=1023
    //% group="Feedback"
    //% weight=95
    export function setRemoteVibrationFeedback(level: number): void {
        if (feedbackPin < 0)
            return
        
        level = ux.inRange(level, 0, 1034)
        pins.analogWritePin(AnalogPin.P8, level);
        return;
    }
}
