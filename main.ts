/**
 * Extensions for various hardware include remotes, motors, servos, sensors etc.
 * If you want support for you hardware added to here, post me the hardware for me to test and use
 * and then either wait for me to have time to learn to use it, or submit a pull request with your code changes.
 */
//% color="#303030" weight=100 icon="\uf0e7"
namespace microX {

    const PWM_PCA9685_ADDRESS = 0x40

    let initializedPhaseWidthModulationDriver = false
    let initializedRobotbit = false
    let initializedPowerbrickPixels = false
    let initializedPowerbrickMp3Player = false
    let initializedYBRemote = false

    let robotbitPixels: RgbMatrix = null
    let powerblockPixels: RgbMatrix = null

    let prevDistance: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let phaseWidthPeriodMicrosec = 20000
    let phaseWidthLevels = 4096

    /**
     * Servo number (1 to 8)
     */
    export enum Servo {
        //% block
        Servo1 = 1,
        //% block
        Servo2 = 2,
        //% block
        Servo3 = 3,
        //% block
        Servo4 = 4,
        //% block
        Servo5 = 5,
        //% block
        Servo6 = 6,
        //% block
        Servo7 = 7,
        //% block
        Servo8 = 8
    }

    /**
     * Motor number
     */
    export enum Motor {
        //% block
        RobitbitM1A = 0,
        //% block
        RobotbitM1B = 1,
        //% block
        RobotbitM2A = 2,
        //% block
        RobotbitM2B = 3,
        //% block
        PowerblockM1 = 0,
        //% block
        PowerblockM2 = 1
    }

    export enum ButtonState {
        //% block
        Released = 0,
        //% block
        Pressed = 1
    }
    
    /**
     * YB-EMH02 ver 1.2 remote buttons
     */
    export enum YBRemoteButton {
        //% block
        JoystickZ = 8,
        //% block
        B1Red = 13,
        //% block
        B2Green = 14,
        //% block
        B3Blue = 15,
        //% block
        B4Yellow = 16
    }

    /**
     * Powerbrick digital port (1 to 7)
     */
    export enum PowerbrickDigitalPort {
        //% block
        DigialPort1 = 0,
        //% block
        DigialPort2 = 1,
        //% block
        DigialPort3 = 2,
        //% block
        DigialPort4 = 3,
        //% block
        DigialPort5 = 4,
        //% block
        DigialPort6 = 5,
        //% block
        DigialPort7 = 6
    }

    /**
     * PowerbrickDigitalPortToPins
     */
    const PowerbrickDigitalPortToPinsDict = [
        [DigitalPin.P8, DigitalPin.P0],
        [DigitalPin.P12, DigitalPin.P1],
        [DigitalPin.P13, DigitalPin.P2],
        [DigitalPin.P15, DigitalPin.P14],
        [DigitalPin.P6, DigitalPin.P3],
        [DigitalPin.P7, DigitalPin.P4],
        [DigitalPin.P9, DigitalPin.P10]
    ]

    /**
     * Powerbrick serial port (1 to 4)
     */
    export enum PowerbrickSerialPort {
        //% block
        SerialPort1 = 0,
        //% block
        SerialPort2 = 1,
        //% block
        SerialPort3 = 2,
        //% block
        SerialPort4 = 3
    }

    const PowerbrickSerialPortToPinsDict = [
        [SerialPin.P8, SerialPin.P0],
        [SerialPin.P12, SerialPin.P1],
        [SerialPin.P13, SerialPin.P2],
        [SerialPin.P15, SerialPin.P14]
    ]

    /**
     * Powerbrick analog port (1, 2, 3, 5, 6, 7)
     */
    export enum PowerbrickAnalogPort {
        //% block
        AnalogPort1 = 0,
        //% block
        AnalogPort2 = 1,
        //% block
        AnalogPort3 = 2,
        //% block
        AnalogPort5 = 3,
        //% block
        AnalogPort6 = 4,
        //% block
        AnalogPort7 = 5
    }

    const PowerbrickAnalogPortToPinDict = [
        AnalogPin.P0,
        AnalogPin.P1,
        AnalogPin.P2,
        AnalogPin.P3,
        AnalogPin.P4,
        AnalogPin.P10
    ]

    /**
     * When you connect a module to a DIGITAL Powerbrick port, this returns the Microbit pin in use
     * @param port port module is connected to
     * @param pinNumber pin 0 or 1 of port
     */
    //% block="Powerbrick Digital port %port | pin0 or pin1 %pinNumber to Microbit pin"
    //% pinNumber.min=0 pinNumber.max=1
    //% group="Powerbrick"
    //% weight=10
    export function PowerbrickDigitalPortToPin(port: PowerbrickDigitalPort, pinNumber: number = 0): DigitalPin {
        if (port < PowerbrickDigitalPort.DigialPort1 || port > PowerbrickDigitalPort.DigialPort7 || pinNumber < 0 || pinNumber > 1)
            return null
        return PowerbrickDigitalPortToPinsDict[port][pinNumber]
    }

    /**
     * When you connect a module to a SERIAL Powerbrick port, this returns the Microbit pin in use
     * @param port port module is connected to
     * @param pinNumber pin 0 or 1 of port
     */
    //% block="Powerbrick Serial port %port | pin0 or pin1 %pinNumber to Microbit pin"
    //% pinNumber.min=0 pinNumber.max=1
    //% group="Powerbrick"
    //% weight=10
    export function PowerbrickSerialPortToPin(port: PowerbrickSerialPort, pinNumber: number = 0): SerialPin {
        if (port < PowerbrickSerialPort.SerialPort1 || port > PowerbrickSerialPort.SerialPort4)
            return null
        return PowerbrickSerialPortToPinsDict[port][pinNumber]
    }

    /**
     * When you connect a module to an ANALOG Powerbrick port, this returns the Microbit pin in use
     * @param port port module is connected to
     */
    //% block="Powerbrick Analog port %port to Microbit pin"
    //% group="Powerbrick"
    //% weight=10
    export function PowerbrickAnalogPortToPin(port: PowerbrickAnalogPort): AnalogPin {
        if (port < PowerbrickAnalogPort.AnalogPort1 || port > PowerbrickAnalogPort.AnalogPort7)
            return null
        return PowerbrickAnalogPortToPinDict[port]
    }

    /**
     * Powerbrick MP3 action (1, 2, 3, 5, 6, 7)
     */
    export enum PowerbrickMp3ControlAction {
        //% block
        Play = 0xaa,
        //% block
        Stop = 0xab,
        //% block
        Next = 0xac,
        //% block
        Prev = 0xad
    }

    function inRange(x: number, minValue: number, maxValue: number): number {
        if (x < minValue)
            x = minValue
        else if (x > maxValue)
            x = maxValue
        return x
    }

    /**
     * Initialize for Kittenbot Robotbit
     */
    //% block="Initialize Robotbit"
    //% group="Robotbit"
    //% weight=9
    export function intializeRobotbit(): void {
        if (initializedRobotbit)
            return
        
        initializePhaseWidthModulationDriver()
        
        robotbitPixels = new RgbMatrix(1, 4, DigitalPin.P16)
        
        initializedRobotbit = true
    }

    /**
     * Initialize Kittenbot Powerbrick pixels module
     * @param pin0 digital pin, use PowerbrickDigitalPortToPin(port=???, pinNumber=0) to select pin for the port you are using
     */
    //% block="Initialize Powerbrick Pixels module connected to digital pin0 %pin0 (convert from digital port)"
    //% port.fieldEditor="gridpicker" port.fieldOptions.columns=2
    //% group="Powerbrick pixels"
    //% weight=8
    export function intializePowerbrickPixels(pin0: DigitalPin): void {
        if (initializedPowerbrickPixels || pin0 == null)
            return

        powerblockPixels = new RgbMatrix(8, 8, pin0)
        
        initializedPowerbrickPixels = true
    }

    /**
     * Initializes the MP3 player connected to a specific serial pin (or Powerbrick serial port)
     * @param pin1 serial pin, use PowerbrickSerialPortToPin(port=???, pinNumber=1) to select pin for the port you are using
     */
    //% block="Initialize Powerbrick MP3 Player connected to serial pin1 %pin1 (convert from serial port)"
    //% group="MP3"
    //% weight=8
    export function InitializeMp3Player(pin1: SerialPin): void {   
        if (initializedPowerbrickMp3Player)
            return
        
        serial.redirect(pin1, SerialPin.P16, BaudRate.BaudRate9600)
    }

    /**
     * Initialize for Yahboom remote
     */
    //% block="Initialize Yahboom remote"
    //% group="Yahboom remote"
    //% weight=9
    export function initializeYahboomRemote(): void {
        if (initializedYBRemote)
            return
        pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P13, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P14, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P15, PinPullMode.PullUp)
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
        initializePhaseWidthModulationDriver()
        initializedYBRemote = true
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="Yahboom remote X (-1=left to 1=right)"
    //% group="Yahboom remote"
    //% weight=7
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
    //% group="Yahboom remote"
    //% weight=7
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
    //% block="On Yahboom remote button %button | state %state"
    //% button.fieldEditor="gridpicker button.fieldOptions.columns=3
    //% state.fieldEditor="gridpicker state.fieldOptions.columns=3
    //% group="Yahboom remote"
    //% weight=7
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

    function i2cwrite(address: number, reg: number, value: number) {
        let buffer = pins.createBuffer(2)
        buffer[0] = reg
        buffer[1] = value
        pins.i2cWriteBuffer(address, buffer)
    }

    // function i2ccmd(address: number, value: number) {
    //     let buffer = pins.createBuffer(1)
    //     buffer[0] = value
    //     pins.i2cWriteBuffer(address, buffer)
    // }

    function i2cread(address: number, reg: number) {
        pins.i2cWriteNumber(address, reg, NumberFormat.UInt8BE)
        let val = pins.i2cReadNumber(address, NumberFormat.UInt8BE)
        return val
    }

    function setPeriod(periodMicrosecs: number): void {
        // Constrain the frequency
        let prescale = 25 * periodMicrosecs / phaseWidthLevels - 1
        let oldmode = i2cread(PWM_PCA9685_ADDRESS, 0x00)
        let newmode = (oldmode & 0x7f) | 0x10 // sleep
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, newmode) // go to sleep
        i2cwrite(PWM_PCA9685_ADDRESS, 0xfe, prescale) // set the prescaler
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode)
        control.waitMicros(5000)
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode | 0xa1)
    }

    /**
     * Initialize the phase width modulation driver used for servos and motors
     */
    //% block="Initialize Phase Width Modulation Driver (for servos and motors)"
    //% group="Movement"
    //% weight=9
    export function initializePhaseWidthModulationDriver(): void {
        if (initializedPhaseWidthModulationDriver)
            return
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, 0x00)
        // Operate at 50Hz
        setPeriod(phaseWidthPeriodMicrosec)
        initializedPhaseWidthModulationDriver = true
    }

    function setPwm(channel: number, low2Bytes: number, high2Bytes: number): void {
        if (channel < 0 || 15 < channel)
            return
        
        initializePhaseWidthModulationDriver()
        
        let buffer = pins.createBuffer(5)
        buffer[0] = (channel << 2) + 6
        buffer[1] = low2Bytes & 0xff
        buffer[2] = (low2Bytes >>> 8) & 0xff
        buffer[3] = high2Bytes & 0xff
        buffer[4] = (high2Bytes >>> 8) & 0xff
        pins.i2cWriteBuffer(PWM_PCA9685_ADDRESS, buffer)
    }

    /**
     * Set servo pulse width
     * @param motorNum where motor is connected e.g.: M1A
     * @param speed [-4096...4096] speed
    */
    //% block="Motor run connected to %motorNum | to speed %speed"
    //% speed.min=-4096 speed.max=4096
    //% motor.fieldEditor="gridpicker" motor.fieldOptions.columns=2
    //% group="Movement"
    //% weight=6
    export function MotorRun(motorNum: Motor, speed: number): void {
        if (motorNum < 0 || 3 < motorNum)
            return
        
        initializePhaseWidthModulationDriver()
        
        let speed1 = speed
        speed1 = inRange(speed1, -phaseWidthLevels, phaseWidthLevels)

        let speed2 = 0
        if (speed1 < 0) {
            speed2 = -speed1
            speed1 = 0
        }

        // Motors are mapped to channels [[0, 1], [2, 3], [4, 5], [6, 7]]
        let channel = motorNum << 1
        setPwm(channel, 0, speed1)
        setPwm(channel + 1, 0, speed2)
    }

    /**
     * Set servo pulse width
     * @param servoNum where servo is connected e.g.: Servo1
     * @param pulseWidth [5...19990] pulse width in uSec
    */
    //% block="Servo pulse width connected to %servoNum | to pulse widths (uSec) %pulseWidth"
    //% pulseWidth.min=1 pulseWidth.max=19999
    //% servoNum.fieldEditor="gridpicker" servoNum.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Movement" advanced=true
    //% weight=6
    export function setServoPulseWidth(servoNum: Servo, pulseWidth: number): void {
        // TODO: Try to use 20480.0 uSec (48.828125 Hz) instead of 20000.0 uSec (50 Hz) to get more precise results (500uS pulse will be 512uS pulses instead)
        initializePhaseWidthModulationDriver()
        // 50Hz --> Full cycle is 20mS (20000uS), normalize this from range 0...20000uS to 0...4096
        let value = Math.round(pulseWidth * phaseWidthLevels / phaseWidthPeriodMicrosec)
        value = inRange(value, 0, phaseWidthLevels)
        // Servos are mapped to channels [8, 9, 10, 11, 12, 13, 14, 15]
        setPwm(servoNum + 7, 0, value)
    }

    /**
     * Set Orange/Green Geekservo speed
     * @param servoNum where servo is connected e.g.: Servo1
     * @param speed [-1000...1000] speed
    */
    //% block="Orange/Green Geekservo connected to %servoNum | to speed %speed"
    //% speed.min=-1000 speed.max=1000
    //% servoNum.fieldEditor="gridpicker" servoNum.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=6
    export function setOrangeGreenGeekservoSpeed(servoNum: Servo, speed: number): void {
        // TODO: When trying to use 20480.0 uSec instead of 20000.0 uSec and change speed range from -1000...1000 to -1024...1024
        // reverse: 500uS-1500uS, 0: 1500uS, forward: 1500uS-2500uS
        let zeroPulse = phaseWidthPeriodMicrosec * 3 / 40
        let minPulse = phaseWidthPeriodMicrosec / 40
        let maxPulse = phaseWidthPeriodMicrosec  / 8
        let pulseWidth = zeroPulse + speed
        pulseWidth = inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Grey Geekservo angle
     * @param servoNum where servo is connected e.g.: Servo1
     * @param degree [-45...225] angle in degrees e.g.: -45, 90, 225
    */
    //% block="Grey Geekservo connected to %servoNum | to degree %degree"
    //% degree.min=-45 degree.max=225
    //% servoNum.fieldEditor="gridpicker" servoNum.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=6
    export function setGreyGeekservoAngle(servoNum: Servo, degree: number): void {
        // -45deg: 600uS, 225deg: 2400uS (6.6667 uS/deg = 20.0/3.0)
        let degreeRange = 270
        let phaseRangePercent = 9

        // Limit degrees to range [-45,225]
        let degree_norm = (degree + 45.0) % 360
        if (degree_norm < 0)
            degree_norm += 360
        if (degree_norm > 270) {
            if (degree_norm < 315)
                degree_norm = 270
            else
                degree_norm = 0
        }
        let minPulse = phaseWidthPeriodMicrosec * 3 / 100
        let maxPulse = phaseWidthPeriodMicrosec * 6 / 50
        //let pulseWidth = degree_norm * 20.0 / 3.0 + minPulse
        let pulseWidth = degree_norm * phaseWidthPeriodMicrosec * degreeRange / phaseRangePercent / 100 + minPulse
        pulseWidth = inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set LARGE Grey Geekservo angle
     * @param servoNum where servo is connected e.g.: Servo1
     * @param degree [0...360) angle in degrees e.g.: -45, 90, 225
    */
    //% block="LARGE grey Geekservo connected to %servoNum | to degree %degree"
    //% degree.min=0 degree.max=360
    //% servoNum.fieldEditor="gridpicker" servoNum.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Movement"
    //% weight=6
    export function setLargeGreyGeekservoAngle(servoNum: Servo, degree: number): void {
        // TODO: When I have a servo like this, check if this is 0 to 360 or 0 to 350 and if only goes to 350 degress, replace constants
        // 0deg: 500uS, 360deg: 2500uS
        
        // Shift degrees to range [0,360)
        let degree_norm = (degree % 360)
        if (degree_norm < 0)
            degree_norm += 360

        let minPulse = phaseWidthPeriodMicrosec / 40
        let maxPulse = phaseWidthPeriodMicrosec  / 8
        let pulseWidth = degree_norm * maxPulse / 360 + minPulse
        pulseWidth = inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Abstraction for led matrices
     */
    export class RgbMatrix {
        rows: number
        columns: number
        pin: DigitalPin
        displayBuffer: Buffer

        constructor(rows: number, columns: number, pin: DigitalPin) {
            this.rows = rows
            this.columns = columns
            this.pin = pin
            this.displayBuffer = pins.createBuffer(rows * columns * 3)
        }
    
        /**
         * Set powerbrick all pixels' color
         * @param r pixel red intensity [0,255]
         * @param g pixel green intensity [0,255]
         * @param b pixel blue intensity [0,255]
        */
        public setAllPixels(r: number, g: number, b: number): void {
            r = inRange(r, 0, 255)
            g = inRange(g, 0, 255)
            b = inRange(b, 0, 255)
            for (let y = 0; y < this.rows; y++) {
                for (let x = 0; x < this.columns; x++) {
                    this._setPixel(y, x, r, g, b)
                }
            }
        }
        
        /**
         * Set pixel color
         * @param y pixel y-coordinate [0,7]
         * @param x pixel y-coordinate [0,7]
         * @param r pixel red intensity [0,255]
         * @param g pixel green intensity [0,255]
         * @param b pixel blue intensity [0,255]
        */
       public setPixel(y: number, x: number, r: number, g: number, b: number): void {
            y = inRange(y, 0, this.rows - 1)
            x = inRange(x, 0, this.columns - 1)
            r = inRange(r, 0, 255)
            g = inRange(g, 0, 255)
            b = inRange(b, 0, 255)
            this._setPixel(y, x, r, g, b)
        }
        
        private _setPixel(y: number, x: number, r: number, g: number, b: number): void {
            // 3 channels/sub-pixels (RGB) per pixel
            let pixelOffset = 0
            pixelOffset = (y * this.columns + x) * 3
            this.displayBuffer[pixelOffset + 0] = g
            this.displayBuffer[pixelOffset + 1] = r
            this.displayBuffer[pixelOffset + 2] = b
        }

        /**
         * Refresh pixels
        */
        public refresh() {
            ws2812b.sendBuffer(this.displayBuffer, this.pin)
        }

    }

    /**
     * Set powerbrick all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Powerbrick pixels to color red %r | green %g | blue %b"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% r.fieldEditor="gridpicker" r.fieldOptions.columns=2
    //% g.fieldEditor="gridpicker" g.fieldOptions.columns=2
    //% b.fieldEditor="gridpicker" b.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Powerbrick pixels"
    //% weight=3
    export function setPowerbrickAllPixels(r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        powerblockPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set powerbrick pixel color
     * @param y pixel y-coordinate [0,7]
     * @param x pixel x-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Powerbrick pixel y %y | x %x | to color red %r | green %g | blue %b"
    //% y.min=0 y.max=7 x.min=0 x.max=7 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% y.fieldEditor="gridpicker" y.fieldOptions.columns=2
    //% x.fieldEditor="gridpicker" x.fieldOptions.columns=2
    //% r.fieldEditor="gridpicker" r.fieldOptions.columns=2
    //% g.fieldEditor="gridpicker" g.fieldOptions.columns=2
    //% b.fieldEditor="gridpicker" b.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Powerbrick pixels"
    //% weight=3
    export function setPowerbrickPixel(y: number, x: number, r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        // The pixels are wired up in a weird order, workaround:
        if (x % 2 == 0)
            powerblockPixels.setPixel(x, y, r, g, b)
        else
            powerblockPixels.setPixel(x, 7 - y, r, g, b)
    }

    /**
     * Refresh powerbrick pixels
    */
    //% block="Refresh/update Powerbrick pixels"
    //% group="Powerbrick pixels"
    //% weight=3
    export function refreshPowerbrickPixels() {
        if (initializedPowerbrickPixels == false)
            return
        powerblockPixels.refresh()
    }

    /**
     * Set robotbit all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Robotbit pixels to color red %r | green %g | blue %b"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% r.fieldEditor="gridpicker" r.fieldOptions.columns=2
    //% g.fieldEditor="gridpicker" g.fieldOptions.columns=2
    //% b.fieldEditor="gridpicker" b.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Robotbit pixels"
    //% weight=3
    export function setRobotBitAllPixels(r: number, g: number, b: number): void {
        if (initializedRobotbit == false)
            return
        robotbitPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set robotbit pixel color
     * @param x pixel x-coordinate [0,3]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Robotbit pixel x %x | to color red %r | green %g | blue %b"
    //% x.min=0 x.max=3 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% r.fieldEditor="gridpicker" r.fieldOptions.columns=2
    //% g.fieldEditor="gridpicker" g.fieldOptions.columns=2
    //% b.fieldEditor="gridpicker" b.fieldOptions.columns=2
    //% inlineInputMode=inline
    //% group="Robotbit pixels"
    //% weight=3
    export function setRobotBitPixel(x: number, r: number, g: number, b: number): void {
        if (initializedRobotbit == false)
            return
        robotbitPixels.setPixel(0, x, r, g, b)
    }

    /**
     * Refresh robotbit pixels
    */
    //% block="Refresh/update Robotbit pixels"
    //% port.min=0 port.max=6
    //% group="Robotbit pixels"
    //% weight=3
    export function refreshRobotBitPixels() {
        if (initializedRobotbit == false)
            return
        robotbitPixels.refresh()
    }

    function digitalPinNumber(pin: DigitalPin): number {
        switch (pin) {
            case DigitalPin.P0: return 0
            case DigitalPin.P1: return 1
            case DigitalPin.P2: return 2
            case DigitalPin.P3: return 3
            case DigitalPin.P4: return 4
            case DigitalPin.P5: return 5
            case DigitalPin.P6: return 6
            case DigitalPin.P7: return 7
            case DigitalPin.P8: return 8
            case DigitalPin.P9: return 9
            case DigitalPin.P10: return 10
            case DigitalPin.P11: return 11
            case DigitalPin.P12: return 12
            case DigitalPin.P13: return 13
            case DigitalPin.P14: return 14
            case DigitalPin.P15: return 15
        }
        return -1
    }

    function _ultrasonicDistance(pin: DigitalPin, pullMode: PinPullMode, mult: number, div: number): number {
        
        let pinNum = digitalPinNumber(pin)
        if (pinNum < 0 || pinNum > 15)
            return 0

        pins.setPull(pin, pullMode)
        
        // turn off for 2uS
        pins.digitalWritePin(pin, 0)
        control.waitMicros(2)

        // send pulse for 10uS
        pins.digitalWritePin(pin, 1)
        control.waitMicros(10)

        // turn off
        pins.digitalWritePin(pin, 0)

        // read pulse
        let distance = pins.pulseIn(pin, PulseValue.High, 25000)

        // on timeout return lastdistance
        if (distance == 0) {
            distance = prevDistance[pinNum]
        } else {
            prevDistance[pinNum] = distance
        }
        
        return Math.floor(distance * mult / div)
    }
    
    /**
     * Measure distance using Cat-head shaped sensor v1.0 (with connection holes in ears)
     * @param pin digital pin
     */
    //% block="Ultrasonic distance of cat-sensor connected to %pin"
    //% group="Sensors"
    //% weight=4
    export function ultrasonicDistanceCatShapedSensor(pin: DigitalPin): number {
        return _ultrasonicDistance(pin, PinPullMode.PullDown, 21, 800)
    }

    /**
     * Measure distance using Powerblock's ultrasonic module
     * @param pin0 digital pin, use PowerbrickDigitalPortToPin(port=???, pinNumber=0) to select pin for the port you are using
     */
    //% block="Ultrasonic distance of Powerbrick module connected to %pin (convert from Digital port)"
    //% group="Sensors"
    //% weight=4
    export function ultrasonicDistancePowerblockUltrasonicModule(pin0: DigitalPin): number {
        return _ultrasonicDistance(pin0, PinPullMode.PullNone, 10, 348)
    }

    /**
     * Measure sound level using Powerblock's ultrasonic module
     * @param pin analog pin, use PowerbrickAnalogPortToPin(port=???) to select pin for the port you are using
     */
    //% block="Sound level of Powerbrick module connected to %pin (convert from Analog port)"
    //% group="Sensors"
    //% weight=4
    export function soundLevelPowerblockUltrasonicModule(pin: AnalogPin): number {
        return pins.analogReadPin(pin)
    }

    /**
     * Measure distance using Cat-head shaped sensor with LEDs in ears
     * @param pin digital pin
     */
    //% block="Ultrasonic distance of cat-sensor with LED-ears connected to %pin"
    //% group="Sensors"
    //% weight=4
    export function ultrasonicDistanceCatShapedSensorWithLeds(pin: DigitalPin): number {
        return _ultrasonicDistance(pin, PinPullMode.PullNone, 9, 348)
    }

    let mp3PlayerStartByte = 0x7e
    let mp3PlayerEndByte = 0xef

    function _mp3PlayerSendArray(command: number, data: Array<number>): void {
        if (initializedPowerbrickMp3Player == false)
            return
        if (data == null)
            return
        let len = data.length
        if (len > 250)
            return
        let buffer = pins.createBuffer(len + 5)
        let sum: number = mp3PlayerStartByte + len + 3 + command
        buffer[0] = mp3PlayerStartByte
        buffer[1] = len + 3
        buffer[2] = command
        for (let i = 0; i < len; i++) {
            let d = data[i]
            buffer[3 + i] = d
            sum += d
        }
        buffer[len + 3] = sum
        buffer[len + 4] = mp3PlayerEndByte
        serial.writeBuffer(buffer)
    }

    function _mp3PlayerSendString(command: number, data: string): void {
        if (initializedPowerbrickMp3Player == false)
            return
        if (data == null)
            return
        let len = data.length
        if (len > 250)
            return
        let buffer = pins.createBuffer(len + 5)
        let sum: number = mp3PlayerStartByte + len + 3 + command
        buffer[0] = mp3PlayerStartByte
        buffer[1] = len + 3
        buffer[2] = command
        for (let i = 0; i < len; i++) {
            let d = data.charCodeAt(i)
            buffer[3 + i] = d
            sum += d
        }
        buffer[len + 3] = sum
        buffer[len + 4] = mp3PlayerEndByte
        serial.writeBuffer(buffer)
    }

    /**
     * Control the MP3 player
     * @param controlAction control action
     */
    //% block="Powerbrick MP3 Player do %controlAction"
    //% group="MP3"
    //% weight=2
    export function mp3PlayerControl(controlAction: PowerbrickMp3ControlAction): void {
        if (controlAction < PowerbrickMp3ControlAction.Play || controlAction > PowerbrickMp3ControlAction.Prev)
            return
        _mp3PlayerSendArray(controlAction, [])
    }

    /**
     * Set volume
     * @param volume volume
     */
    //% block="Powerbrick MP3 Player set volume to %volume"
    //% volume.min=0 volume.max=31
    //% group="MP3"
    //% weight=2
    export function mp3PlayerSetVolume(volume: number): void {
        volume = inRange(volume, 0, 31)
        _mp3PlayerSendArray(0xae, [volume])
    }

    /**
     * Play a file by index
     * @param filenumber 1-based file number
     */
    //% block="Powerbrick MP3 Player play file number %filenumber"
    //% filenumber.min=1 filenumber.max=255
    //% group="MP3"
    //% weight=2
    export function mp3PlayerPlayFilenumber(filenumber: number): void {
        filenumber = inRange(filenumber, 1, 255)
        _mp3PlayerSendArray(0xa2, [0, filenumber])
    }

    /**
     * Play a file by name
     * @param filename file name, up to 250 characters
     */
    //% block="Powerbrick MP3 Player play file name %filename"
    //% group="MP3"
    //% weight=2
    export function mp3PlayerPlayFile(filename: string): void {
        if (filename == null || filename.length == 0)
            return
        _mp3PlayerSendString(0xa3, filename)
    }

}
