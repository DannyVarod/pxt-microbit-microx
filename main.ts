/**
 * Extensions for various hardware include remotes, motors, servos, sensors etc.
 * If you want support for you hardware added to here, post me the hardware for me to test and use
 * and then either wait for me to have time to learn to use it, or submit a pull request with your code changes.
 */
//% color="#303030" weight=100 icon="\uf0e7"
namespace microX {

    const PWM_PCA9685_ADDRESS = 0x40

    let initializedPhaseWidthModulationDriver = false
    let initializedPowerbrickPixels = false
    let initializedRobotbit = false
    let initializedYBRemote = false

    let powerblockPixels: RgbMatrix = null
    let robotbitPixels: RgbMatrix = null

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
     * PowerbrickDigitalPorts
     */
    const PowerbrickDigitalPorts = [
        [DigitalPin.P8, DigitalPin.P0],
        [DigitalPin.P12, DigitalPin.P1],
        [DigitalPin.P13, DigitalPin.P2],
        [DigitalPin.P15, DigitalPin.P14],
        [DigitalPin.P6, DigitalPin.P3],
        [DigitalPin.P7, DigitalPin.P4],
        [DigitalPin.P9, DigitalPin.P10]
    ]

    function inRange(x: number, minValue: number, maxValue: number): number {
        if (x < minValue)
            x = minValue
        else if (x > maxValue)
            x = maxValue
        return x
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="joystickX"
    //% group="Yahboom remote"
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
    //% group="Yahboom remote"
    export function joystickY() {
        
        // Normalize from [0,1023] to [-512,511]
        let readValue = 512 - pins.analogReadPin(AnalogPin.P1)
        
        // Ignore values between -25 and 25 since joystick may not be calibrated (mine had a Y-offset of 12)
        if (-25 < readValue && readValue < 25)
            readValue = 0
        
        // Normalize from -512..511 to -1.0 ... 1.0
        return readValue / 512.0
    }

    //% block="initialize for Yahboom remote"
    //% group="Yahboom remote"
    export function initializeYBRemote(): void {
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

    //% block="initialize powerbit pixels|%port"
    //% weight=99
    //% port.min=1 port.max=7
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group="Powerbrick pixels"
    export function intializePowerbrickPixels(port: number): void {
        if (initializedPowerbrickPixels)
            return

        if (port < 1 || port > 7)
            //throw new Error("Port is out of range")
            return
        
        powerblockPixels = new RgbMatrix(8, 8, PowerbrickDigitalPorts[port - 1][0])
        
        initializedPowerbrickPixels = true
    }

    //% block="initialize for Kittenbot Robotbit"
    //% group="Robotbit"
    export function intializeRobotbit(): void {
        if (initializedRobotbit)
            return
        
        initializePhaseWidthModulationDriver()
        
        robotbitPixels = new RgbMatrix(1, 4, DigitalPin.P16)
        
        initializedRobotbit = true
    }

    /**
     * Act on YB-EMH02 ver 1.2 remote button click (Click on Joystick (Z), B1, B2, B3, B4)
     */
    //% block="onYBRemoteButton|%button|%state"
    //% blockGap=10
    //% name.fieldEditor="gridpicker name.fieldOptions.columns=5
    //% group="Yahboom remote"
    export function onYBRemoteButton(button: YBRemoteButton, state: ButtonState, body: Action): void {
        
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

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescale = 25000000 / 4096 / freq - 1
        let oldmode = i2cread(PWM_PCA9685_ADDRESS, 0x00)
        let newmode = (oldmode & 0x7f) | 0x10 // sleep
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, newmode) // go to sleep
        i2cwrite(PWM_PCA9685_ADDRESS, 0xfe, prescale) // set the prescaler
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode)
        control.waitMicros(5000)
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode | 0xa1)
    }

    //% block="initialize PWM driver (for servos and motors)"
    //% group="PhaseWidthModulation"
    export function initializePhaseWidthModulationDriver(): void {
        if (initializedPhaseWidthModulationDriver)
            return
        i2cwrite(PWM_PCA9685_ADDRESS, 0x00, 0x00)
        // Operate at 50Hz
        setFreq(50)
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
     * @param motorNum Motor; e.g.: M1A
     * @param speed [-4096...4096] speed
    */
    //% blockId=robotbit_motor_run block="MotorRun|motorNum %motorNum|speed %speed"
    //% weight=85
    //% speed.min=-4096 speed.max=4096
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group="PhaseWidthModulation"
    export function MotorRun(motorNum: Motor, speed: number): void {
        if (motorNum < 0 || 3 < motorNum)
            return
        
        initializePhaseWidthModulationDriver()
        
        let speed1 = speed
        speed1 = inRange(speed1, -4096, 4096)

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
     * @param servoNum Servo Channel; e.g.: S1
     * @param pulseWidth [5...19990] pulse width in uSec
    */
    //% blockId=setServoPulseWidth block="set servo pulse width (uSec)|%servoNum|pulseWidth %pulseWidth"
    //% weight=99
    //% pulseWidth.min=1 pulseWidth.max=19999
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group="PhaseWidthModulation"
    export function setServoPulseWidth(servoNum: Servo, pulseWidth: number): void {
        initializePhaseWidthModulationDriver()
        // 50Hz --> Full cycle is 20mS (20000uS), normalize this from range 0...20000uS to 0...4096
        let value = Math.round(pulseWidth * 4096.0 / 20000.0)
        value = inRange(value, 0, 4096)
        // Servos are mapped to channels [8, 9, 10, 11, 12, 13, 14, 15]
        setPwm(servoNum + 7, 0, value)
    }

    /**
     * Set Geekservo speed
     * @param servoNum Servo Channel; e.g.: S1
     * @param speed [-1000...1000] speed
    */
    //% blockId=setOrangeGreenGeekservoSpeed block="set Geekservo speed (orange/green)|%servoNum|speed %speed"
    //% weight=99
    //% speed.min=-1000 speed.max=1000
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group="PhaseWidthModulation"
    export function setOrangeGreenGeekservoSpeed(servoNum: Servo, speed: number): void {
        // reverse: 500uS-1500uS, 0: 1500uS, forward: 1500uS-2500uS
        let pulseWidth = 1500 + speed
        pulseWidth = inRange(pulseWidth, 500, 2500)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Geekservo angle
     * @param servoNum Servo Channel; e.g.: S1
     * @param degree [-45...225] degree of servo; e.g.: -45, 90, 225
    */
    //% blockId=setGreyGeekservoAngle block="set Geekservo angle (grey)|servoNum %servoNum|degree %degree"
    //% weight=99
    //% degree.min=-45 degree.max=225
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group="PhaseWidthModulation"
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
        pulseWidth = inRange(pulseWidth, 600, 2400)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Geekservo angle
     * @param servoNum Servo Channel; e.g.: S1
     * @param degree [0...360) degree of servo; e.g.: -45, 90, 225
    */
    //% blockId=setLargeGreygGeekservoAngle block="set large Geekservo angle (grey 2Kg)|servoNum %servoNum|degree %degree"
    //% weight=99
    //% degree.min=0 degree.max=360
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% group="PhaseWidthModulation"
    export function setLargeGreygGeekservoAngle(servoNum: Servo, degree: number): void {
        // TODO: When I have a servo like this, check if this is 0 to 360 or 0 to 350 and if only goes to 350 degress, replace constants
        // 0deg: 500uS, 360deg: 2500uS
        let degree_norm = (degree % 360)
        if (degree_norm < 0)
            degree_norm += 360
        let pulseWidth = degree_norm * 2000.0 / 360.0 + 500
        pulseWidth = inRange(pulseWidth, 500, 2500)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    export class RgbMatrix {
        rows: number
        columns: number
        port: DigitalPin
        displayBuffer: Buffer

        constructor(rows: number, columns: number, port: DigitalPin) {
            this.rows = rows
            this.columns = columns
            this.port = port
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
                    this.setPixelPrivate(y, x, r, g, b)
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
            this.setPixelPrivate(y, x, r, g, b)
        }
        
        private setPixelPrivate(y: number, x: number, r: number, g: number, b: number): void {
            // 3 channels/sub-pixels (RGB) per pixel
            let subPixelOffset = (y * this.columns + x) * 3
            this.displayBuffer[subPixelOffset + 0] = g
            this.displayBuffer[subPixelOffset + 1] = r
            this.displayBuffer[subPixelOffset + 2] = b
        }

        /**
         * Refresh pixels
        */
        public refresh() {
            ws2812b.sendBuffer(this.displayBuffer, this.port);
        }

    }

    /**
     * Set powerbrick all pixels color
     * @param y pixel y-coordinate [0,7]
     * @param x pixel y-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% blockId=setPowerbrickAllPixels block="set powerbit all pixels|%r|%g|%b"
    //% weight=99
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    //% group="Powerbrick pixels"
    export function setPowerbrickAllPixels(r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        powerblockPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set powerbrick pixel color
     * @param y pixel y-coordinate [0,7]
     * @param x pixel y-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% blockId=setPowerbrickPixel block="set powerbit pixel|%y|%x|%r|%g|%b"
    //% weight=99
    //% y.min=0 y.max=7 x.min=0 x.max=7 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=7
    //% group="Powerbrick pixels"
    export function setPowerbrickPixel(y: number, x: number, r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        powerblockPixels.setPixel(y, x, r, g, b)
    }

    /**
     * Refresh powerbrick pixels
    */
    //% blockId=refreshPowerbrickPixels block="refresh powerbit pixels|%port"
    //% weight=99
    //% port.min=0 port.max=6
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% blockId=refreshPowerbrickPixels block="Refresh powerbrick pixels"
    //% group="Powerbrick pixels"
    export function refreshPowerbrickPixels() {
        if (initializedPowerbrickPixels == false)
            return
        powerblockPixels.refresh()
    }

    /**
     * Set robotbit all pixels color
     * @param y pixel y-coordinate [0,7]
     * @param x pixel y-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% blockId=setRobotBitAllPixels block="set robotbit all pixels|%r|%g|%b"
    //% weight=99
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
    //% group="Robotbit pixels"
    export function setRobotBitAllPixels(r: number, g: number, b: number): void {
        if (initializedRobotbit == false)
            return
        robotbitPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set robotbit pixel color
     * @param x pixel y-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% blockId=setRobotBitPixel block="set robotbit pixel|%x|%r|%g|%b"
    //% weight=99
    //% x.min=0 x.max=7 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
    //% group="Robotbit pixels"
    export function setRobotBitPixel(x: number, r: number, g: number, b: number): void {
        if (initializedRobotbit == false)
            return
            robotbitPixels.setPixel(0, x, r, g, b)
    }

    /**
     * Refresh robotbit pixels
    */
    //% blockId=refreshRobotBitPixels block="refresh robotbit pixels|%port"
    //% weight=99
    //% port.min=0 port.max=6
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% blockId=refreshPowerbrickPixels block="Refresh powerbrick pixels"
    //% group="Robotbit pixels"
    export function refreshRobotBitPixels() {
        if (initializedRobotbit == false)
            return
        robotbitPixels.refresh()
    }

}
