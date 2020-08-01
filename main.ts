/**
 * Extensions for various hardware include remotes, motors, servos, sensors etc.
 * If you want support for you hardware added to here, post me the hardware for me to test and use
 * and then either wait for me to have time to learn to use it, or submit a pull request with your code changes.
 */
//% color="#303030" weight=100 icon="\uf0e7"
namespace microX {

    const PWM_PCA9685_ADDRESS = 0x40

    let wasInitializedPhaseWidthModulationDriver = false

    /**
     * Servo number (1 to 8)
     */
    export enum Servo {
        S1 = 1,
        S2 = 2,
        S3 = 3,
        S4 = 4,
        S5 = 5,
        S6 = 6,
        S7 = 7,
        S8 = 8
    }

    /**
     * Motor number
     */
    export enum Motor {
        M1A = 0,
        M1B = 1,
        M2A = 2,
        M2B = 3
    }

    export enum ButtonState {
        //% block="Released"
        Released = 0,
        //% block="Pressed"
        Pressed = 1
    }
    
    /**
     * YB-EMH02 ver 1.2 remote buttons
     */
    export enum YBRemoteButton {
        //% block="JoystickZ"
        JoystickZ = 8,
        //% block="B1Red"
        B1Red = 13,
        //% block="B2Green"
        B2Green = 14,
        //% block="B3Blue"
        B3Blue = 15,
        //% block="B4Yellow"
        B4Yellow = 16
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="joystickX"
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
    //% block="joystickY"
    export function joystickY() {
        
        // Normalize from [0,1023] to [-512,511]
        let readValue = 512 - pins.analogReadPin(AnalogPin.P1)
        
        // Ignore values between -25 and 25 since joystick may not be calibrated (mine had a Y-offset of 12)
        if (-25 < readValue && readValue < 25)
            readValue = 0
        
        // Normalize from -512..511 to -1.0 ... 1.0
        return readValue / 512.0
    }

    //% block="initialize YB remote buttons to pullup"
    export function initializeYBRemoteButtons(): void {
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
    }

    /**
     * Act on YB-EMH02 ver 1.2 remote button click (Click on Joystick (Z), B1, B2, B3, B4)
     */
    //% block="onYBRemoteButton %pin |%state"
    //% blockGap=10
    //% name.fieldEditor="gridpicker name.fieldOptions.columns=5
    export function onYBRemoteButton(button: YBRemoteButton, state: ButtonState, body: Action): void {
        
        let pulseValue: PulseValue = PulseValue.Low
        if (state == ButtonState.Released)
            pulseValue = PulseValue.High
        
        let pin: DigitalPin = DigitalPin.P8
        switch button {
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
        }

        pins.onPulsed(pin, pulseValue, body)
    }

    function i2cwrite(address: number, reg: number, value: number) {
        let buffer = pins.createBuffer(2)
        buffer[0] = reg
        buffer[1] = value
        pins.i2cWriteBuffer(address, buffer)
    }

    function i2ccmd(address: number, value: number) {
        let buffer = pins.createBuffer(1)
        buffer[0] = value
        pins.i2cWriteBuffer(address, buffer)
    }

    function i2cread(address: number, reg: number) {
        pins.i2cWriteNumber(address, reg, NumberFormat.UInt8BE)
        let val = pins.i2cReadNumber(address, NumberFormat.UInt8BE)
        return val
    }

    //% block="initialize PWM driver (for servos and motors)"
    export function initPhaseWidthModulationDriver(): void {
        if (wasInitializedPhaseWidthModulationDriver)
            return
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, 0x00)
        // Operate at 50Hz
        setFreq(50)
        for (let channel = 0; channel < 16; channel++) {
            setPwm(channel, 0, 0)
        }
        wasInitializedPhaseWidthModulationDriver = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescale = 25000000 / 4096 / freq - 1
        let oldmode = i2cread(PWM_PCA9685_ADDRESS, 0x00)
        let newmode = (oldmode & 0x7F) | 0x10 // sleep
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, newmode) // go to sleep
        i2cwrite(PWM_PCA9685_ADDRESS, 0xFE, prescale) // set the prescaler
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode)
        control.waitMicros(5000)
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode | 0xa1)
    }

    function setPwm(channel: number, low2Bytes: number, high2Bytes: number): void {
        if (channel < 0 || channel > 15)
            return
        let buffer = pins.createbuffer(5)
        buffer[0] = (channel << 2) + 6
        buffer[1] = low2Bytes & 0xff
        buffer[2] = (low2Bytes >> 8) & 0xff
        buffer[3] = high2Bytes & 0xff
        buffer[4] = (high2Bytes >> 8) & 0xff
        pins.i2cWriteBuffer(PWM_PCA9685_ADDRESS, buffer)
    }

    //% blockId=robotbit_motor_run block="Motor|%motorNum|speed %speed"
    //% weight=85
    //% speed.min=-255 speed.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function MotorRun(motorNum: Motor, speed: number): void {
        if (motorNum < 0 || 3 < motorNum)
            return
        initPhaseWidthModulationDriver()
        let speed1 = Math.round(speed * 16) // map 256 to 4096
        if (speed1 > 4095) {
            speed1 = 4095
        }
        if (speed1 < -4095) {
            speed1 = -4095
        }
        let speed2 = 0
        if (speed1 < 0) {
            speed2 = -speed1
            speed1 = 0
        }
        let channel = motorNum << 1
        setPwm(channel, 0, speed1)
        setPwm(channel + 1, 0, speed2)
    }

    /**
     * Rotate Servo
     * @param servoNum Servo Channel; e.g.: S1
     * @param degree [0-180] degree of servo; e.g.: 0, 90, 180
    */
    //% blockId=rotateServo block="Rotate Servo|%servoNum|degree %degree"
    //% weight=100
    //% degree.min=0 degree.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function rotateServo(servoNum: Servo, degree: number): void {
        initPhaseWidthModulationDriver()
        // 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600) // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000
        setPwm(servoNum + 7, 0, value)
    }

    /**
     * Set servo pulse width
     * @param servoNum Servo Channel; e.g.: S1
     * @param pulseWidth [1...19999] pulse width in uSec
    */
    //% blockId=setGreyGeekservoAngle block="set servo pulse width (uSec)|%servoNum|pulseWidth %pulseWidth"
    //% weight=99
    //% pulseWidth.min=1uS pulseWidth.max=19999uS
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function setServoPulseWidth(servoNum: Servo, pulseWidth: number): void {
        initPhaseWidthModulationDriver()
        // 50Hz --> Full cycle is 20mS (20000uS), normalize this from range 0...20000uS to 0...4096 (12bits)
        let value = Math.round(pulseWidth * 4096 / 20000)
        if (value < 0)
            value = 0
        else if (value > 4095)
            value = 4095
        setPwm(servoNum + 7, 0, value)
    }

    /**
     * Set Geekservo speed
     * @param servoNum Servo Channel; e.g.: S1
     * @param speed [-1...1] degree of servo; e.g.: -45, 90, 225
    */
    //% blockId=setOrangeGreenGeekservoSpeed block="set Geekservo speed (orange/green)|%servoNum|speed %speed"
    //% weight=99
    //% speed.min=-1 speed.max=1
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function setOrangeGreenGeekservoSpeed(servoNum: Servo, speed: number): void {
        // reverse: 500uS-1500uS, 0: 1500uS, forward: 1500uS-2000uS
        let pulseWidth = (speed * 500) + 1500
        if (pulseWidth > 1500)
            pulseWidth = 1500
        else if (pulseWidth < 500)
            pulseWidth = 500
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Geekservo angle
     * @param servoNum Servo Channel; e.g.: S1
     * @param degree [-45...225] degree of servo; e.g.: -45, 90, 225
    */
    //% blockId=setGreyGeekservoAngle block="set Geekservo angle (grey)|%servoNum|degree %degree"
    //% weight=99
    //% degree.min=-45 degree.max=225
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function setGreyGeekservoAngle(servoNum: Servo, degree: number): void {
        // -45deg: 600uS, 225deg: 2400uS (6.6667 uS/deg = 20.0/3.0)
        let degree_norm = (degree + 45.0) % 360
        if (degree_norm < 0)
            degree_norm += 360
        if (degree_norm > 270) {
            if (degree_norm < 315)
                degree_norm = 270
            else
                degree_norm = 0
        }
        let pulseWidth = degree_norm * 20.0 / 3.0 + 600
        if (pulseWidth > 2400)
            pulseWidth = 2400
        else if (pulseWidth < 600)
            pulseWidth = 600
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Geekservo angle
     * @param servoNum Servo Channel; e.g.: S1
     * @param degree [0...360) degree of servo; e.g.: -45, 90, 225
    */
    //% blockId=setGreyGeekservoAngle block="set large Geekservo angle (grey 2Kg)|%servoNum|degree %degree"
    //% weight=99
    //% degree.min=0 degree.max=360
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function setLargeGreygGeekservoAngle(servoNum: Servo, degree: number): void {
        // TODO: When I have a servo like this, check if this is 0 to 360 or 0 to 350 and if only goes to 350 degress, replace constants
        // 0deg: 500uS, 360deg: 2500uS
        let degree_norm = (degree % 360)
        if (degree_norm < 0)
            degree_norm += 360
        let pulseWidth = degree_norm * 2000.0 / 360.0 + 500
        if (pulseWidth > 2500)
            pulseWidth = 2500
        else if (pulseWidth < 500)
            pulseWidth = 500
        setServoPulseWidth(servoNum, pulseWidth)
    }

}
