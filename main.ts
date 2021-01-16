/**
 * Extensions for various hardware include remotes, motors, servos, sensors etc.
 * If you want support for you hardware added to here, post me the hardware for me to test and use
 * and then either wait for me to have time to learn to use it, or submit a pull request with your code changes.
 */
//% block=ux
//% color="#303030" weight=50 icon="\uf0e7"
//% groups='["Robotbit", "Motion", "Sensors", "Pixels", "MP3"]'
namespace microX {
    /**
     * Pins
     */
    export enum PinNumber {
        //% block=Pin0
        Pin0 = 0,
        //% block=Pin1
        Pin1 = 1,
        //% block=Pin2
        Pin2 = 2,
        //% block=Pin3
        Pin3 = 3,
        //% block=Pin4
        Pin4 = 4,
        //% block=Pin6
        Pin6 = 6,
        //% block=Pin7
        Pin7 = 7,
        //% block=Pin8
        Pin8 = 8,
        //% block=Pin9
        Pin9 = 9,
        //% block=Pin10
        Pin10 = 10,
        //% block=Pin12
        Pin12 = 12,
        //% block=Pin13
        Pin13 = 13,
        //% block=Pin14
        Pin14 = 14,
        //% block=Pin15
        Pin15 = 15,
        //% block=Pin16
        Pin16 = 16,

        //% block=AnalogPin0
        AnalogPin0 = Pin0,
        //% block=AnalogPin1
        AnalogPin1 = Pin1,
        //% block=AnalogPin2
        AnalogPin2 = Pin2,
        //% block=AnalogPin3
        AnalogPin3 = Pin3,
        //% block=AnalogPin4
        AnalogPin4 = Pin4,
        //% block=AnalogPin10
        AnalogPin10 = Pin10,

        //% block=PowerbrickPort1A
        PowerbrickPort1A = Pin0,
        //% block=PowerbrickPort1B
        PowerbrickPort1B = Pin8,
        //% block=PowerbrickPort2A
        PowerbrickPort2A = Pin1,
        //% block=PowerbrickPort2B
        PowerbrickPort2B = Pin12,
        //% block=PowerbrickPort3A
        PowerbrickPort3A = Pin2,
        //% block=PowerbrickPort3B
        PowerbrickPort3B = Pin13,
        //% block=PowerbrickPort4A
        PowerbrickPort4A = Pin14,
        //% block=PowerbrickPort4B
        PowerbrickPort4B = Pin15,
        //% block=PowerbrickPort5A
        PowerbrickPort5A = Pin3,
        //% block=PowerbrickPort5B
        PowerbrickPort5B = Pin6,
        //% block=PowerbrickPort6A
        PowerbrickPort6A = Pin4,
        //% block=PowerbrickPort6B
        PowerbrickPort6B = Pin7,
        //% block=PowerbrickPort7A
        PowerbrickPort7A = Pin10,
        //% block=PowerbrickPort7B
        PowerbrickPort7B = Pin9,

        //% block=PowerbrickPort1_DigitalA
        PowerbrickPort1_DigitalA = Pin0,
        //% block=PowerbrickPort1_DigitalB
        PowerbrickPort1_DigitalB = Pin8,
        //% block=PowerbrickPort2_DigitalA
        PowerbrickPort2_DigitalA = Pin1,
        //% block=PowerbrickPort2_DigitalB
        PowerbrickPort2_DigitalB = Pin12,
        //% block=PowerbrickPort3_DigitalA
        PowerbrickPort3_DigitalA = Pin2,
        //% block=PowerbrickPort3_DigitalB
        PowerbrickPort3_DigitalB = Pin13,
        //% block=PowerbrickPort4_DigitalA
        PowerbrickPort4_DigitalA = Pin14,
        //% block=PowerbrickPort4_DigitalB
        PowerbrickPort4_DigitalB = Pin15,
        //% block=PowerbrickPort5_DigitalA
        PowerbrickPort5_DigitalA = Pin3,
        //% block=PowerbrickPort5_DigitalB
        PowerbrickPort5_DigitalB = Pin6,
        //% block=PowerbrickPort6_DigitalA
        PowerbrickPort6_DigitalA = Pin4,
        //% block=PowerbrickPort6_DigitalB
        PowerbrickPort6_DigitalB = Pin7,
        //% block=PowerbrickPort7_DigitalA
        PowerbrickPort7_DigitalA = Pin10,
        //% block=PowerbrickPort7_DigitalB
        PowerbrickPort7_DigitalB = Pin9,

        //% block=PowerbrickPort1_Analog
        PowerbrickPort1_Analog = Pin0,
        //% block=PowerbrickPort2_Analog
        PowerbrickPort2_Analog = Pin1,
        //% block=PowerbrickPort3_Analog
        PowerbrickPort3_Analog = Pin2,
        //% block=PowerbrickPort5_Analog
        PowerbrickPort5_Analog = Pin3,
        //% block=PowerbrickPort6_Analog
        PowerbrickPort6_Analog = Pin4,
        //% block=PowerbrickPort7_Analog
        PowerbrickPort7_Analog = Pin10,

        //% block=PowerbrickPort1_SerialA
        PowerbrickPort1_SerialA = Pin0,
        //% block=PowerbrickPort1_SerialB
        PowerbrickPort1_SerialB = Pin8,
        //% block=PowerbrickPort2_SerialA
        PowerbrickPort2_SerialA = Pin1,
        //% block=PowerbrickPort2_SerialB
        PowerbrickPort2_SerialB = Pin12,
        //% block=PowerbrickPort3_SerialA
        PowerbrickPort3_SerialA = Pin2,
        //% block=PowerbrickPort3_SerialB
        PowerbrickPort3_SerialB = Pin13,
        //% block=PowerbrickPort4_SerialA
        PowerbrickPort4_SerialA = Pin14,
        //% block=PowerbrickPort4_SerialB
        PowerbrickPort4_SerialB = Pin15,
        //% block=PowerbrickPort7_SerialA
        PowerbrickPort7_SerialA = Pin10,
        //% block=PowerbrickPort7_SerialB
        PowerbrickPort7_SerialB = Pin9
    }

    export function pinToDigitalPin(pinNumber: PinNumber): DigitalPin {
        switch (pinNumber) {
            case PinNumber.Pin0: return DigitalPin.P0
            case PinNumber.Pin1: return DigitalPin.P1
            case PinNumber.Pin2: return DigitalPin.P2
            case PinNumber.Pin3: return DigitalPin.P3
            case PinNumber.Pin4: return DigitalPin.P4
            case PinNumber.Pin6: return DigitalPin.P6
            case PinNumber.Pin7: return DigitalPin.P7
            case PinNumber.Pin8: return DigitalPin.P8
            case PinNumber.Pin9: return DigitalPin.P9
            case PinNumber.Pin10: return DigitalPin.P10
            case PinNumber.Pin12: return DigitalPin.P12
            case PinNumber.Pin13: return DigitalPin.P13
            case PinNumber.Pin14: return DigitalPin.P14
            case PinNumber.Pin15: return DigitalPin.P15
            case PinNumber.Pin16: return DigitalPin.P16
            default: return null
        }
    }

    export function pinToSerialPin(pinNumber: PinNumber): SerialPin {
        switch (pinNumber) {
            case PinNumber.Pin0: return SerialPin.P0
            case PinNumber.Pin1: return SerialPin.P1
            case PinNumber.Pin2: return SerialPin.P2
            case PinNumber.Pin8: return SerialPin.P8
            case PinNumber.Pin12: return SerialPin.P12
            case PinNumber.Pin13: return SerialPin.P13
            case PinNumber.Pin14: return SerialPin.P14
            case PinNumber.Pin15: return SerialPin.P15
            case PinNumber.Pin16: return SerialPin.P16
            default: return null
        }
    }

    export function pinToAnalogPin(pinNumber: PinNumber): AnalogPin {
        switch (pinNumber) {
            case PinNumber.Pin0: return AnalogPin.P0
            case PinNumber.Pin1: return AnalogPin.P1
            case PinNumber.Pin2: return AnalogPin.P2
            case PinNumber.Pin3: return AnalogPin.P3
            case PinNumber.Pin4: return AnalogPin.P4
            case PinNumber.Pin10: return AnalogPin.P10
            default: return null
        }
    }

    export function inRange(x: number, minValue: number, maxValue: number): number {
        if (x < minValue)
            x = minValue
        else if (x > maxValue)
            x = maxValue
        return x
    }

    export function i2cwrite(address: number, reg: number, value: number) {
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

    export function i2cread(address: number, reg: number) {
        pins.i2cWriteNumber(address, reg, NumberFormat.UInt8BE)
        let val = pins.i2cReadNumber(address, NumberFormat.UInt8BE)
        return val
    }
}

//% block=uxRemotes
//% color="#303030" weight=49 icon="\uf0e7"
//% groups='["Yahboom"]'
namespace microX_Remotes {

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
    //% blockId="microX_initializeYahboomRemote"
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
        microX_Motion.initializePhaseWidthModulationDriver()
        initializedYBRemote = true
    }

    /**
     * Get X-axis value of YB-EMH02 ver 1.2 joystick (port2) between -1 (left) and 1 (right)
     */
    //% block="Yahboom remote X (-1=left to 1=right)"
    //% blockId="microX_joystickX"
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
    //% blockId="microX_joystickY"
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
    //% blockId="microX_onYahboomRemoteButton"
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
}

//% block=uxMotion
//% color="#303030" weight=48 icon="\uf0e7"
//% groups='["Initialization", "Motors", "Speed Servos", "Angle Servos"]'
namespace microX_Motion {

    const PWM_PCA9685_ADDRESS = 0x40
    
    // const PHASE_WIDTH_PERIOD_MICROSEC = 20000
    const PHASE_WIDTH_PERIOD_MICROSEC = 20480
    const PHASE_WIDTH_LEVELS = 4096

    let initializedPhaseWidthModulationDriver = false

    /**
     * Servo number (1 to 8)
     */
    export enum Servo {
        //% block=Servo1
        Servo1 = 1,
        //% block=Servo2
        Servo2 = 2,
        //% block=Servo3
        Servo3 = 3,
        //% block=Servo4
        Servo4 = 4,
        //% block=Servo5
        Servo5 = 5,
        //% block=Servo6
        Servo6 = 6,
        //% block=Servo7
        Servo7 = 7,
        //% block=Servo8
        Servo8 = 8
    }

    /**
     * Motor number
     */
    export enum Motor {
        //% block=RobotbitM1A
        RobotbitM1A = 0,
        //% block=RobotbitM1B
        RobotbitM1B = 1,
        //% block=RobotbitM2A
        RobotbitM2A = 2,
        //% block=RobotbitM2B
        RobotbitM2B = 3,
        //% block=PowerblockM1
        PowerblockM1 = 0,
        //% block=PowerblockM2
        PowerblockM2 = 1
    }

    function setPeriod(periodMicrosecs: number): void {
        // Constrain the frequency
        let prescale = 25 * periodMicrosecs / PHASE_WIDTH_LEVELS - 1
        let oldmode = microX.i2cread(PWM_PCA9685_ADDRESS, 0x00)
        let newmode = (oldmode & 0x7f) | 0x10 // sleep
        microX.i2cwrite(PWM_PCA9685_ADDRESS, 0x00, newmode) // go to sleep
        microX.i2cwrite(PWM_PCA9685_ADDRESS, 0xfe, prescale) // set the prescaler
        microX.i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode)
        control.waitMicros(5000)
        microX.i2cwrite(PWM_PCA9685_ADDRESS, 0x00, oldmode | 0xa1)
    }
    
    /**
     * Initialize the phase width modulation driver used for servos and motors
     */
    //% block="Initialize Phase Width Modulation Driver (for servos and motors)"
    //% blockId="microX_initializePhaseWidthModulationDriver"
    //% group="Initialization"
    //% weight=89
    export function initializePhaseWidthModulationDriver(): void {
        if (initializedPhaseWidthModulationDriver)
            return
        microX.i2cwrite(PWM_PCA9685_ADDRESS, 0x00, 0x00)
        // Operate at 50Hz
        setPeriod(PHASE_WIDTH_PERIOD_MICROSEC)
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
     * Set motor speed
     * @param motorNum where motor is connected e.g.: M1A
     * @param speed [-4095...4095] speed
    */
    //% block="Set motor speed for motor|connected to %motorNum|speed %speed"
    //% blockId="microX_setMotor"
    //% speed.min=-4095 speed.max=4095
    //% group="Motors"
    //% weight=88
    export function setMotor(motorNum: Motor, speed: number): void {
        if (motorNum < 0 || 3 < motorNum)
            return
        
        initializePhaseWidthModulationDriver()
        
        let speed1 = speed
        speed1 = microX.inRange(speed1, -PHASE_WIDTH_LEVELS+1, PHASE_WIDTH_LEVELS-1)

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
     * @param pulseWidth [5...20470] pulse width in uSec
    */
    //% block="Servo pulse width|connected to %servoNum|pulse width (uSec) %pulseWidth"
    //% blockId="microX_setServoPulseWidth"
    //% pulseWidth.min=5 pulseWidth.max=20470
    //% inlineInputMode=inline
    //% advanced=true
    //% weight=87
    export function setServoPulseWidth(servoNum: Servo, pulseWidth: number): void {
        
        initializePhaseWidthModulationDriver()
        // 50Hz --> Full cycle is 20mS (20000uS), normalize this from range 0...20000uS to 0...4096
        let value = Math.round(pulseWidth * PHASE_WIDTH_LEVELS / PHASE_WIDTH_PERIOD_MICROSEC)
        value = microX.inRange(value, 1, PHASE_WIDTH_LEVELS - 1)
        // Servos are mapped to channels [8, 9, 10, 11, 12, 13, 14, 15]
        setPwm(servoNum + 7, 0, value)
    }

    /**
     * Set Orange/Green Geekservo speed
     * @param servoNum where servo is connected e.g.: Servo1
     * @param speed [-1024...1024] speed
    */
    //% block="Orange/Green Geekservo|connected to %servoNum|speed %speed"
    //% blockId="microX_setOrangeGreenGeekservoSpeed"
    //% speed.min=-1024 speed.max=1024
    //% inlineInputMode=inline
    //% group="Speed Servos"
    //% weight=86
    export function setOrangeGreenGeekservoSpeed(servoNum: Servo, speed: number): void {
        // For 20000uSec cycle: reverse=500uS-1500uS, 0: 1500uS, forward=1500uS-2500uS
        let zeroPulse = PHASE_WIDTH_PERIOD_MICROSEC * 3 / 40
        let minPulse = PHASE_WIDTH_PERIOD_MICROSEC / 40
        let maxPulse = PHASE_WIDTH_PERIOD_MICROSEC  / 8
        let pulseWidth = zeroPulse + speed
        pulseWidth = microX.inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Grey Geekservo angle
     * @param servoNum where servo is connected e.g.: Servo1
     * @param degree [-45...225] angle in degrees e.g.: -45, 90, 225
    */
    //% block="Grey Geekservo|connected to %servoNum|degree %degree"
    //% blockId="microX_setGreyGeekservoAngle"
    //% degree.min=-45 degree.max=225
    //% inlineInputMode=inline
    //% group="Angle Servos"
    //% weight=85
    export function setGreyGeekservoAngle(servoNum: Servo, degree: number): void {
        // For 20000uSec cycle: -45deg: 600uS, 225deg: 2400uS (6.6667 uS/deg = 20.0/3.0)
        let degreeRange = 270
        let phaseRangePercent = 9 // (2400-600)/20000 * 100

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
        let minPulse = PHASE_WIDTH_PERIOD_MICROSEC * 3 / 100
        let maxPulse = PHASE_WIDTH_PERIOD_MICROSEC * 6 / 50
        let pulseWidth = degree_norm * PHASE_WIDTH_PERIOD_MICROSEC * phaseRangePercent / 100 / degreeRange + minPulse
        pulseWidth = microX.inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set LARGE Grey Geekservo angle
     * @param servoNum where servo is connected e.g.: Servo1
     * @param degree [0...360] angle in degrees e.g.: 0, 15, 30, 90, 180, 270, 360
    */
    //% block="LARGE grey Geekservo|connected to %servoNum|degree %degree"
    //% blockId="microX_setLargeGreyGeekservoAngle"
    //% degree.min=0 degree.max=360
    //% inlineInputMode=inline
    //% group="Angle Servos"
    //% weight=84
    export function setLargeGreyGeekservoAngle(servoNum: Servo, degree: number): void {
        // 0deg: 512uS, 360deg: 2512uS, max: 2560us
        
        // Shift degrees to range [0,360]
        let degree_norm = (degree % 360)
        if (degree_norm < 0)
            degree_norm += 360

        let pulseWidth = degree_norm * PHASE_WIDTH_LEVELS * 125 / 256 / 360 + (PHASE_WIDTH_LEVELS / 8)
        pulseWidth = microX.inRange(pulseWidth, PHASE_WIDTH_LEVELS / 8, PHASE_WIDTH_LEVELS * 5 / 8)
        setServoPulseWidth(servoNum, pulseWidth)
    }
}

//% block=uxSensors
//% color="#303030" weight=47 icon="\uf0e7"
//% groups='["Distance", "Sound", "Line Trackers", "Light", "Proximity", "Gestures"]'
namespace microX_Sensors {

    let usedPrevDistance = false
    let prevDistance: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    function _ultrasonicDistance(pinNumber: microX.PinNumber, pullMode: PinPullMode, mult: number, div: number, attempt: number): number {
        let pin = microX.pinToDigitalPin(pinNumber)
        if (pin == null)
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

        // on timeout
        if (distance == 0) {
            if (attempt < 1) {
                control.waitMicros(10000)
                return _ultrasonicDistance(pinNumber, pullMode, mult, div, attempt + 1)
            } else if (!usedPrevDistance) {
                distance = prevDistance[pinNumber]
                usedPrevDistance = true
            } else {
                usedPrevDistance = false
            }
        } else {
            usedPrevDistance = false
        }
        
        return Math.floor(distance * mult / div)
    }
    
    /**
     * Measure distance using Cat-head shaped sensor v1.0 (with connection holes in ears)
     * @param pinNumber digital pin number
     */
    //% block="Ultrasonic distance of cat-sensor connected to|digital pin %pinNumber"
    //% blockId="microX_ultrasonicDistanceCatShapedSensor"
    //% group="Distance"
    //% weight=79
    export function ultrasonicDistanceCatShapedSensor(pinNumber: microX.PinNumber): number {
        return _ultrasonicDistance(pinNumber, PinPullMode.PullDown, 21, 800, 0)
    }

    /**
     * Measure distance using Powerblock's ultrasonic module
     * @param pinNumber digital pin number
     */
    //% block="Ultrasonic distance of Powerbrick module connected to|digital pin %pinNumber"
    //% blockId="microX_ultrasonicDistancePowerblockUltrasonicModule"
    //% group="Distance"
    //% weight=81
    export function ultrasonicDistancePowerblockUltrasonicModule(pinNumber: microX.PinNumber): number {
        return _ultrasonicDistance(pinNumber, PinPullMode.PullNone, 10, 348, 0)
    }

    /**
     * Measure sound level using Powerblock's ultrasonic module
     * @param pinNumber analog pin number
     */
    //% block="Sound level of Powerbrick module connected to|analog pin %pinNumber"
    //% blockId="microX_soundLevelPowerblockUltrasonicModule"
    //% group="Sound"
    //% weight=78
    export function soundLevelPowerblockUltrasonicModule(pinNumber: microX.PinNumber): number {
        let pin = microX.pinToAnalogPin(pinNumber)
        if (pin == null)
            return 0
        return pins.analogReadPin(pin)
    }

    /**
     * Measure distance using Cat-head shaped sensor with LEDs in ears
     * @param pinNumber digital pin number
     */
    //% block="Ultrasonic distance of cat-sensor with LED-ears connected to|digital pin %pinNumber"
    //% blockId="microX_ultrasonicDistanceCatShapedSensorWithLeds"
    //% group="Distance"
    //% weight=76
    export function ultrasonicDistanceCatShapedSensorWithLeds(pinNumber: microX.PinNumber): number {
        return _ultrasonicDistance(pinNumber, PinPullMode.PullNone, 9, 348, 0)
    }

    /**
     * Line state
     */
    export enum LineState {
        //% block=White
        White = 0,
        //% block=Black
        Black = 1
    }

    /**
     * Initializes a line tracker sensor with 2 channels connected to 2 specific digial pins
     * @param ch1 digital pin number
     * @param ch2 digital pin number
     */
    //% block="Initialize Line Tracker 2CH connected to|digial pin %ch1|digial pin %ch2"
    //% blockId="microX_initializeLineTracker2Channels"
    //% group="Line Trackers"
    //% weight=75
    export function initializeLineTracker2Channels(ch1: microX.PinNumber, ch2: microX.PinNumber): void {
        pins.setPull(microX.pinToDigitalPin(ch1), PinPullMode.PullUp)
        pins.setPull(microX.pinToDigitalPin(ch2), PinPullMode.PullUp)
    }

    /**
     * Initializes a line tracker sensor with 3 channels connected to 3 specific digial pins
     * @param ch1 digital pin number
     * @param ch2 digital pin number
     * @param ch3 digital pin number
     */
    //% block="Initialize Line Tracker 3CH connected to|digial pin %ch1|digial pin %ch2|digial pin %ch3"
    //% blockId="microX_initializeLineTracker3Channels"
    //% group="Line Trackers"
    //% weight=74
    export function initializeLineTracker3Channels(ch1: microX.PinNumber, ch2: microX.PinNumber, ch3: microX.PinNumber): void {
        pins.setPull(microX.pinToDigitalPin(ch1), PinPullMode.PullUp)
        pins.setPull(microX.pinToDigitalPin(ch2), PinPullMode.PullUp)
        pins.setPull(microX.pinToDigitalPin(ch3), PinPullMode.PullUp)
    }

    /**
     * Get line position from 2 channel tracker
     * @param ch1 digital pin number
     * @param ch2 digital pin number
     */
    //% block="Get line position from 2 channel tracker connected to|digial pin %ch1|digial pin %ch2"
    //% blockId="microX_getLinePosition2Channels"
    //% group="Line Trackers"
    //% weight=73
    export function getLinePosition2Channels(ch1: microX.PinNumber, ch2: microX.PinNumber): string {
        ch1 = 1 - pins.digitalReadPin(microX.pinToDigitalPin(ch1))
        ch2 = 1 - pins.digitalReadPin(microX.pinToDigitalPin(ch2))
        if (ch1 == 0 && ch2 == 0)
            return "?" //  0 0
        else if (ch1 > ch2)
            return "<" // 1 0
        else if (ch1 > ch2)
            return ">" // 0 1
        else return "-" // 1 1
    }

    /**
     * Get line position from 3 channel tracker
     * @param ch1 digital pin number
     * @param ch2 digital pin number
     * @param ch3 digital pin number
     */
    //% block="Get line position from 3 channel tracker connected to|digial pin %ch1|digial pin %ch2|digial pin %ch3"
    //% blockId="microX_getLinePosition3Channels"
    //% group="Line Trackers"
    //% weight=72
    export function getLinePosition3Channels(ch1: microX.PinNumber, ch2: microX.PinNumber, ch3: microX.PinNumber): string {
        ch1 = 1 - pins.digitalReadPin(microX.pinToDigitalPin(ch1))
        ch2 = 1 - pins.digitalReadPin(microX.pinToDigitalPin(ch2))
        ch3 = 1 - pins.digitalReadPin(microX.pinToDigitalPin(ch3))
        if (ch1 == 0 && ch2 == 0 && ch3 == 0)
            return "?" // 0 0 0
        else if (ch1 > ch2 && ch2 == ch3)
            return "<" // 1 0 0
        else if (ch1 == ch2 && ch2 < ch3)
            return ">" // 0 0 1
        else if (ch1 == ch2 && ch2 > ch3)
            return "\\" // 1 1 0
        else if (ch1 < ch2 && ch2 == ch3)
            return "/" // 0 1 1
        else if (ch1 < ch2 && ch2 > ch3)
            return "|" // 0 1 0
        else if (ch1 > ch2 && ch2 < ch3)
            return "H" // 1 0 1
        else return "-" // 1 1 1
    }

    /**
     * Powerbrick gesture and color sensor mode
     */
    enum PowerbrickGestureColorSensorMode {
        //% block=Ambient
        Ambient = 1,
        //% block=Proximity
        Proximity = 2,
        //% block=Gesture
        Gesture = 3,
        //% block=Active
        Active = 4
    }

    const KC_ADDR = 0x6D
    const KC_VERSION = 0x00
    const KC_MODE = 1
    const KC_READCOLOR = 21
    const KC_READCOLORRAW = 23
    const KC_LEDPWM = 24
    const KC_LEDONOFF = 25
    const KC_LEDBIT = 26
    const KC_PROXIMITY = 31
    const KC_GESTURE = 41

    function powerbrickGestureColorModuleSetMode(mode: PowerbrickGestureColorSensorMode): void {
        microX.i2cwrite(KC_ADDR, KC_MODE, mode);
    }

    /**
     * Get brightness using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get brightness"
    //% blockId="microX_powerbrickGestureColorModuleGetBrightness"
    //% group="Light"
    //% weight=71
    export function powerbrickGestureColorModuleGetBrightness(): number {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Ambient)
        pins.i2cWriteNumber(KC_ADDR, KC_READCOLOR, NumberFormat.UInt8BE)
        let buff = pins.i2cReadBuffer(KC_ADDR, 2)
        return buff[1]
    }

    /**
     * Get hue using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get hue"
    //% blockId="microX_powerbrickGestureColorModuleGetHue"
    //% group="Light"
    //% weight=70
    export function powerbrickGestureColorModuleGetHue(): number {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Ambient)
        pins.i2cWriteNumber(KC_ADDR, KC_READCOLOR, NumberFormat.UInt8BE)
        let buff = pins.i2cReadBuffer(KC_ADDR, 2)
        return buff[0] * 2
    }

    /**
     * Get RGB using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get RGB"
    //% blockId="microX_powerbrickGestureColorModuleGetRgb"
    //% group="Light"
    //% weight=69
    export function powerbrickGestureColorModuleGetRgb(): string {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Active)
        pins.i2cWriteNumber(KC_ADDR, KC_READCOLORRAW, NumberFormat.UInt8BE);
        let buff = pins.i2cReadBuffer(KC_ADDR, 4)
        return numberToHex(buff[0]) + numberToHex(buff[1]) + numberToHex(buff[2]) + numberToHex(buff[3])
    }

    /**
     * Set LED of Powerbrick Gesture+Color sensor on/off
     * @param ledNumber 0 for all otherwise 1...4
     */
    //% block="Powerbrick Gesture+Color set LED|led number %ledNumber|on %on"
    //% ledNumber.min=0 ledNumber.max=4
    //% blockId="microX_powerbrickGestureColorModuleSetLed"
    //% group="Proximity"
    //% weight=68
    export function powerbrickGestureColorModuleSetLed(ledNumber: number, on: boolean): void {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Active)
        if (ledNumber < 0 || ledNumber > 4)
            return
        let buf = pins.createBuffer(3)
        buf[0] = KC_LEDONOFF
        buf[1] = ledNumber
        buf[2] = bool2Num(on)
        pins.i2cWriteBuffer(KC_ADDR, buf)
        basic.pause(1)
    }

    /**
     * Set Phase Width Modulation of Powerbrick Gesture+Color sensor's LEDs
     * @param led1On led1On
     * @param led2On led2On
     * @param led3On led3On
     * @param led4On led4On
     */
    //% block="Powerbrick Gesture+Color set LEDs|led1 %led1On|led2 %led2On|led3 %led3On|led4 %led4On"
    //% blockId="microX_powerbrickGestureColorModuleSetLeds"
    //% group="Proximity"
    //% weight=67
    export function powerbrickGestureColorModuleSetLeds(led1On: boolean, led2On: boolean, led3On: boolean, led4On: boolean): void {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Proximity)
        let buf = pins.createBuffer(2)
        buf[0] = KC_LEDBIT
        buf[1] = bool2Num(led1On) + (bool2Num(led2On) << 1) + (bool2Num(led3On) << 2) + (bool2Num(led4On) << 3)
        pins.i2cWriteBuffer(KC_ADDR, buf)
        basic.pause(1)
    }

    /**
     * Set Phase Width Modulation of Powerbrick Gesture+Color sensor's LEDs
     */
    //% block="Powerbrick Gesture+Color set PWM|phase width %pwm"
    //% blockId="microX_powerbrickGestureColorModuleSetPwm"
    //% group="Proximity"
    //% weight=66
    export function powerbrickGestureColorModuleSetPwm(pwm: number): void {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Active)
        microX.i2cwrite(KC_ADDR, KC_LEDPWM, pwm);
    }

    function bool2Num(b: boolean): number {
        return b == true ? 1 : 0
    }

    /**
     * Get Proximity using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get proximity"
    //% blockId="microX_powerbrickGestureColorModuleGetProximity"
    //% group="Proximity"
    //% weight=65
    export function powerbrickGestureColorModuleGetProximity(): number {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Proximity)
        return microX.i2cread(KC_ADDR, KC_PROXIMITY)
    }

    /**
     * Get gesture using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get gesture"
    //% blockId="microX_powerbrickGestureColorModuleGetGesture"
    //% group="Gestures"
    //% weight=64
    export function powerbrickGestureColorModuleGetGesture(): number {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Gesture)
        return microX.i2cread(KC_ADDR, KC_GESTURE)
    }

    function hexToNumber(h: string, offset: number): number {
        return ((h.charCodeAt(offset) - 0x30) << 4) + h.charCodeAt(offset + 1) - 0x30
    }

    function numberToHex(n: number): string {
        return String.fromCharCode((n & 0xf0 >> 4) + 0x30) + String.fromCharCode((n & 0xf) + 0x30)
    }

    export function rgbPixelToRed(rgb: string): number {
        return hexToNumber(rgb, 0)
    }

    export function rgbPixelToGreen(rgb: string): number {
        return hexToNumber(rgb, 2)
    }

    export function rgbPixelToBlue(rgb: string): number {
        return hexToNumber(rgb, 4)
    }

    export function redGreenBlueToRgbPixel(red: number, green: number, blue: number): string {
        let result = numberToHex(red) + numberToHex(green) + numberToHex(blue)
        return result
    }
}

//% block=uxDisplays
//% color="#303030" weight=46 icon="\uf0e7"
//% groups='["Robotbit", "Powerbrick"]'
namespace microX_Displays {

    let robotbitPixels: RgbMatrix = null
    let powerbrickPixels: RgbMatrix = null

    let initializedRobotbitPixels = false
    let initializedPowerbrickPixels = false

    /**
     * Abstraction for led matrices
     */
    export class RgbMatrix {
        rows: number
        columns: number
        digitalPin: DigitalPin
        displayBuffer: Buffer

        constructor(rows: number, columns: number, pinNumber: microX.PinNumber) {
            this.rows = rows
            this.columns = columns
            this.digitalPin = microX.pinToDigitalPin(pinNumber)
            this.displayBuffer = pins.createBuffer(rows * columns * 3)
        }
    
        /**
         * Set powerbrick all pixels' color
         * @param r pixel red intensity [0,255]
         * @param g pixel green intensity [0,255]
         * @param b pixel blue intensity [0,255]
        */
        public setAllPixels(r: number, g: number, b: number): void {
            r = microX.inRange(r, 0, 255)
            g = microX.inRange(g, 0, 255)
            b = microX.inRange(b, 0, 255)
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
            y = microX.inRange(y, 0, this.rows - 1)
            x = microX.inRange(x, 0, this.columns - 1)
            r = microX.inRange(r, 0, 255)
            g = microX.inRange(g, 0, 255)
            b = microX.inRange(b, 0, 255)
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
            ws2812b.sendBuffer(this.displayBuffer, this.digitalPin)
        }

    }

    /**
     * Initialize Kittenbot Robotbit pixels
     * @param pinNumber digital pin number
     */
    //% block="Initialize Robotbit Pixels"
    //% blockId="microX_intializeRobotbitPixels"
    //% group="Robotbit"
    //% weight=49
    export function intializeRobotbitPixels(): void {
        if (initializedRobotbitPixels)
            return
        
        robotbitPixels = new RgbMatrix(1, 4, microX.PinNumber.Pin16)
        initializedRobotbitPixels = true

        // After initializing port set to black to prevent first refresh error
        setRobotBitAllPixels(0, 0, 0)
        refreshRobotBitPixels()
        setRobotBitAllPixels(0, 0, 0)
        refreshRobotBitPixels()
    }

    /**
     * Set robotbit all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Robotbit pixels to color|red %r|green %g|blue %b"
    //% blockId="microX_setRobotBitAllPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Robotbit"
    //% weight=48
    export function setRobotBitAllPixels(r: number, g: number, b: number): void {
        if (initializedRobotbitPixels == false)
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
    //% block="Set Robotbit pixel to color|x %x|red %r|green %g|blue %b"
    //% blockId="microX_setRobotBitPixel"
    //% x.min=0 x.max=3 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Robotbit"
    //% weight=47
    export function setRobotBitPixel(x: number, r: number, g: number, b: number): void {
        if (initializedRobotbitPixels == false)
            return
        robotbitPixels.setPixel(0, x, r, g, b)
    }

    /**
     * Refresh robotbit pixels
    */
    //% block="Refresh/update Robotbit pixels"
    //% blockId="microX_refreshRobotBitPixels"
    //% port.min=0 port.max=6
    //% group="Robotbit"
    //% weight=46
    export function refreshRobotBitPixels() {
        if (initializedRobotbitPixels == false)
            return
        robotbitPixels.refresh()
    }
    
    /**
     * Initialize Kittenbot Powerbrick pixels module
     * @param pinNumber digital pin number
     */
    //% block="Initialize Powerbrick Pixels module connected to|digital pin %pinNumber"
    //% blockId="microX_intializePowerbrickPixels"
    //% group="Powerbrick"
    //% weight=45
    export function intializePowerbrickPixels(pinNumber: microX.PinNumber): void {
        if (initializedPowerbrickPixels || pinNumber == null)
            return

        powerbrickPixels = new RgbMatrix(8, 8, pinNumber)
        
        initializedPowerbrickPixels = true
        
        // After initializing port set to black to prevent first refresh error
        setPowerbrickAllPixels(0, 0, 0)
        refreshPowerbrickPixels()
        setPowerbrickAllPixels(0, 0, 0)
        refreshPowerbrickPixels()
    }

    /**
     * Set powerbrick all pixels color
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Powerbrick pixels to color|red %r|green %g|blue %b"
    //% blockId="microX_setPowerbrickAllPixels"
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Powerbrick"
    //% weight=44
    export function setPowerbrickAllPixels(r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        powerbrickPixels.setAllPixels(r, g, b)
    }
    
    /**
     * Set powerbrick pixel color
     * @param y pixel y-coordinate [0,7]
     * @param x pixel x-coordinate [0,7]
     * @param r pixel red intensity [0,255]
     * @param g pixel green intensity [0,255]
     * @param b pixel blue intensity [0,255]
    */
    //% block="Set Powerbrick pixel to color|y %y|x %x|red %r|green %g|blue %b"
    //% blockId="microX_setPowerbrickPixel"
    //% y.min=0 y.max=7 x.min=0 x.max=7 r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% inlineInputMode=inline
    //% group="Powerbrick"
    //% weight=43
    export function setPowerbrickPixel(y: number, x: number, r: number, g: number, b: number): void {
        if (initializedPowerbrickPixels == false)
            return
        // The pixels are wired up in a weird order, workaround:
        if (x % 2 == 0)
            powerbrickPixels.setPixel(x, y, r, g, b)
        else
            powerbrickPixels.setPixel(x, 7 - y, r, g, b)
    }

    /**
     * Refresh powerbrick pixels
    */
    //% block="Refresh/update Powerbrick pixels"
    //% blockId="microX_refreshPowerbrickPixels"
    //% group="Powerbrick"
    //% weight=42
    export function refreshPowerbrickPixels() {
        if (initializedPowerbrickPixels == false)
            return
        powerbrickPixels.refresh()
    }
}

//% block=uxMp3
//% color="#303030" weight=45 icon="\uf0e7"
//% groups='["Powerbrick"]'
namespace microX_Mp3 {
    

    let mp3PlayerStartByte = 0x7e
    let mp3PlayerEndByte = 0xef

    let initializedPowerbrickMp3Player = false

    /**
     * Powerbrick MP3 action (1, 2, 3, 5, 6, 7)
     */
    export enum PowerbrickMp3ControlAction {
        //% block=Play
        Play = 0xaa,
        //% block=Stop
        Stop = 0xab,
        //% block=Next
        Next = 0xac,
        //% block=Prev
        Prev = 0xad
    }
    
    /**
     * Initializes the MP3 player connected to a specific serial pin (or Powerbrick serial port)
     * @param serialPinTx serial pin number (transmit)
     * @param serialPinRx serial pin number (receive)
     */
    //% block="Initialize Powerbrick MP3 Player connected to|serial pin (TX) %pinNumber|serial pin (RX) %pinNumber"
    //% blockId="microX_initializePowerbrickMp3Player"
    //% group="Powerbrick"
    //% weight=39
    export function initializePowerbrickMp3Player(serialPinTx: microX.PinNumber, serialPinRx: microX.PinNumber): void {   
        if (initializedPowerbrickMp3Player)
            return
        
        let txPin = microX.pinToSerialPin(serialPinTx)
        let rxPin = microX.pinToSerialPin(serialPinRx)
        if (txPin == null || rxPin == null)
            return

        serial.redirect(txPin, rxPin, BaudRate.BaudRate9600)
        initializedPowerbrickMp3Player = true
    }

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
    //% block="Powerbrick MP3 Player|do %controlAction"
    //% blockId="microX_mp3PlayerControl"
    //% group="Powerbrick"
    //% weight=38
    export function mp3PlayerControl(controlAction: PowerbrickMp3ControlAction): void {
        if (controlAction < PowerbrickMp3ControlAction.Play || controlAction > PowerbrickMp3ControlAction.Prev)
            return
        _mp3PlayerSendArray(controlAction, [])
    }

    /**
     * Set volume
     * @param volume volume
     */
    //% block="Powerbrick MP3 Player set|volume %volume"
    //% blockId="microX_mp3PlayerSetVolume"
    //% volume.min=0 volume.max=31
    //% group="Powerbrick"
    //% weight=37
    export function mp3PlayerSetVolume(volume: number): void {
        volume = microX.inRange(volume, 0, 31)
        _mp3PlayerSendArray(0xae, [volume])
    }

    /**
     * Play a file by index
     * @param filenumber 1-based file number
     */
    //% block="Powerbrick MP3 Player play|file number %filenumber"
    //% blockId="microX_mp3PlayerPlayFilenumber"
    //% filenumber.min=1 filenumber.max=255
    //% group="Powerbrick"
    //% weight=36
    export function mp3PlayerPlayFilenumber(filenumber: number): void {
        filenumber = microX.inRange(filenumber, 1, 255)
        _mp3PlayerSendArray(0xa2, [0, filenumber])
    }

    /**
     * Play a file by name
     * @param filename file name, up to 250 characters
     */
    //% block="Powerbrick MP3 Player play|file name %filename"
    //% blockId="microX_mp3PlayerPlayFile"
    //% group="Powerbrick"
    //% weight=35
    export function mp3PlayerPlayFile(filename: string): void {
        if (filename == null || filename.length == 0)
            return
        _mp3PlayerSendString(0xa3, filename)
    }
}
