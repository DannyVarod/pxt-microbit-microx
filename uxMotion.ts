/**
 * microX support for motion (motors, servos).
 */
//% block=uxMotion
//% color="#303030" weight=48 icon="\uf085"
//% groups='["Initialization", "Motors", "Speed Servos", "Angle Servos"]'
namespace uxMotion {

    let pwn_pca9685_address = 0x40

    let phase_width_levels = 4096
    
    // Originally 20000, changed to 20480 for higher accuracy (since this is divided to above number of levels)
    let phase_width_period_microsec = 20480

    let initializedPhaseWidthModulationDriver = false

    /**
     * Servo number to channel mapping
     */
    export enum SERVO {
        //% block=RobotbitServo1
        ROBOTBIT_SERVO1 = 8,
        //% block=RobotbitServo2
        ROBOTBIT_SERVO2 = 9,
        //% block=RobotbitServo3
        ROBOTBIT_SERVO3 = 10,
        //% block=RobotbitServo4
        ROBOTBIT_SERVO4 = 11,
        //% block=RobotbitServo5
        ROBOTBIT_SERVO5 = 12,
        //% block=RobotbitServo6
        ROBOTBIT_SERVO6 = 13,
        //% block=RobotbitServo7
        ROBOTBIT_SERVO7 = 14,
        //% block=RobotbitServo8
        ROBOTBIT_SERVO8 = 15,
        //% block=PowerbrickServo1
        POWERBRICK_SERVO1 = 8,
        //% block=PowerbrickServo2
        POWERBRICK_SERVO2 = 9,
        //% block=PowerbrickServo3
        POWERBRICK_SERVO3 = 10,
        //% block=PowerbrickServo4
        POWERBRICK_SERVO4 = 11,
        //% block=PowerbrickServo5
        POWERBRICK_SERVO5 = 12,
        //% block=PowerbrickServo6
        POWERBRICK_SERVO6 = 13,
        //% block=PowerbrickServo7
        POWERBRICK_SERVO7 = 14,
        //% block=PowerbrickServo8
        POWERBRICK_SERVO8 = 15,
        //% block=SuperbitServo1
        SUPERBIT_SERVO1 = 0,
        //% block=SuperbitServo2
        SUPERBIT_SERVO2 = 1,
        //% block=SuperbitServo3
        SUPERBIT_SERVO3 = 2,
        //% block=SuperbitServo4
        SUPERBIT_SERVO4 = 3,
        //% block=SuperbitServo5
        SUPERBIT_SERVO5 = 4,
        //% block=SuperbitServo6
        SUPERBIT_SERVO6 = 5,
        //% block=SuperbitServo7
        SUPERBIT_SERVO7 = 6,
        //% block=SuperbitServo8
        SUPERBIT_SERVO8 = 7,
    }

    /**
     * Motor number to channel mapping
     * each motor takes up two consecutive channels, hence the gap of 2 between them
     */
    export enum MOTOR {
        //% block=RobotbitM1A
        ROBOTBIT_M1A = 0,
        //% block=RobotbitM1B
        ROBOTBIT_M1B = 2,
        //% block=RobotbitM2A
        ROBOTBIT_M2A = 4,
        //% block=RobotbitM2B
        ROBOTBIT_M2B = 6,
        //% block=PowerbrickM1
        POWERBRICK_M1 = 0,
        //% block=PowerbrickM2
        POWERBRICK_M2 = 2,
        //% block=SuperbitM1
        SUPERBIT_M1 = 8,
        //% block=SuperbitM2
        SUPERBIT_M2 = 10,
        //% block=SuperbitM3
        SUPERBIT_M3 = 12,
        //% block=SuperbitM4
        SUPERBIT_M4 = 14,
    }

    function setPeriod(periodMicrosecs: number): void {
        // Constrain the frequency
        let prescale = 25 * periodMicrosecs / phase_width_levels - 1
        let oldmode = ux.i2cread(pwn_pca9685_address, 0x00)
        let newmode = (oldmode & 0x7f) | 0x10 // sleep
        ux.i2cwrite(pwn_pca9685_address, 0x00, newmode) // go to sleep
        ux.i2cwrite(pwn_pca9685_address, 0xfe, prescale) // set the prescaler
        ux.i2cwrite(pwn_pca9685_address, 0x00, oldmode)
        control.waitMicros(5000)
        ux.i2cwrite(pwn_pca9685_address, 0x00, oldmode | 0xa1)
    }

    /**
     * Initialize the phase width modulation driver used for servos and motors
     */
    //% block="Initialize Phase Width Modulation Driver (for servos and motors)|address %address|levels %levels|widthMicrosec %widthMicrosec"
    //% blockId="ux_initializePhaseWidthModulationDriverAtAddress"
    //% address.min=0 address.max=127 address.defl=64
    //% levels.min=256 levels.max=65536 levels.defl=4096
    //% widthMicrosec.min=10240 widthMicrosec.max=40960 widthMicrosec.defl=20480
    //% group="Initialization"
    //% weight=88
    //% advanced=true
    export function initializePhaseWidthModulationDriverAdvanced(address: number = 0x40, levels: number = 4096, widthMicrosec: number = 20480): void {
        if (initializedPhaseWidthModulationDriver)
            return
        pwn_pca9685_address = address
        phase_width_levels = levels
        phase_width_period_microsec = widthMicrosec
        ux.i2cwrite(address, 0x00, 0x00)
        setPeriod(phase_width_period_microsec)
        initializedPhaseWidthModulationDriver = true
    }

    /**
     * Get the number of levels for phase width modulation
     */
    export function getPhaseWidthLevels(): number {
        return phase_width_levels
    }
    
    /**
     * Initialize the phase width modulation driver used for servos and motors
     */
    //% block="Initialize Phase Width Modulation Driver (for servos and motors)"
    //% blockId="ux_initializePhaseWidthModulationDriver"
    //% group="Initialization"
    //% weight=89
    export function initializePhaseWidthModulationDriver(): void {
        initializePhaseWidthModulationDriverAdvanced()
    }

    export function setPwm(channel: number, low2Bytes: number, high2Bytes: number): void {
        if (channel < 0 || 15 < channel)
            return
        
        initializePhaseWidthModulationDriver()
        
        let buffer = pins.createBuffer(5)
        buffer[0] = (channel << 2) + 6
        buffer[1] = low2Bytes & 0xff
        buffer[2] = (low2Bytes >>> 8) & 0xff
        buffer[3] = high2Bytes & 0xff
        buffer[4] = (high2Bytes >>> 8) & 0xff
        pins.i2cWriteBuffer(pwn_pca9685_address, buffer)
    }

    /**
     * Set motor speed
     * @param motorNum where motor is connected e.g.: M1A
     * @param speed [-4095...4095] speed
    */
    //% block="Set motor speed for motor|connected to %motorNum|speed %speed"
    //% blockId="ux_setMotor"
    //% speed.min=-4095 speed.max=4095
    //% group="Motors"
    //% weight=88
    export function setMotor(motorNum: MOTOR, speed: number): void {
        if (motorNum < 0 || 14 < motorNum || motorNum % 2 != 0)
            return
        
        initializePhaseWidthModulationDriver()
        
        let speed1 = speed
        speed1 = ux.inRange(speed1, -phase_width_levels+1, phase_width_levels-1)

        let speed2 = 0
        if (speed1 < 0) {
            speed2 = -speed1
            speed1 = 0
        }

        setPwm(motorNum, 0, speed1)
        setPwm(motorNum + 1, 0, speed2)
    }

    /**
     * Set servo pulse width
     * @param servoNum where servo is connected e.g.: Servo1
     * @param pulseWidth [5...20470] pulse width in uSec
    */
    //% block="Servo pulse width|connected to %servoNum|pulse width (uSec) %pulseWidth"
    //% blockId="ux_setServoPulseWidth"
    //% pulseWidth.min=5 pulseWidth.max=20470
    //% inlineInputMode=inline
    //% advanced=true
    //% weight=87
    export function setServoPulseWidth(servoNum: SERVO, pulseWidth: number): void {
        if (servoNum < 0 || 15 < servoNum)
            return
        
        initializePhaseWidthModulationDriver()
        // 50Hz --> Full cycle is 20mS (20000uS), normalize this from range 0...20000uS to 0...4096
        let value = Math.round(pulseWidth * phase_width_levels / phase_width_period_microsec)
        value = ux.inRange(value, 1, phase_width_levels - 1)
        setPwm(servoNum, 0, value)
    }

    /**
     * Set Orange/Green Geekservo speed
     * @param servoNum where servo is connected e.g.: Servo1
     * @param speed [-1024...1024] speed
    */
    //% block="Orange/Green Geekservo|connected to %servoNum|speed %speed"
    //% blockId="ux_setOrangeGreenGeekservoSpeed"
    //% speed.min=-1024 speed.max=1024
    //% inlineInputMode=inline
    //% group="Speed Servos"
    //% weight=86
    export function setOrangeGreenGeekservoSpeed(servoNum: SERVO, speed: number): void {
        // For 20000uSec cycle: reverse=500uS-1500uS, 0: 1500uS, forward=1500uS-2500uS
        let zeroPulse = phase_width_period_microsec * 3 / 40
        let minPulse = phase_width_period_microsec / 40
        let maxPulse = phase_width_period_microsec  / 8
        let pulseWidth = zeroPulse + speed
        pulseWidth = ux.inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set Grey Geekservo angle
     * @param servoNum where servo is connected e.g.: Servo1
     * @param degree [-45...225] angle in degrees e.g.: -45, 90, 225
    */
    //% block="Grey Geekservo|connected to %servoNum|degree %degree"
    //% blockId="ux_setGreyGeekservoAngle"
    //% degree.min=-45 degree.max=225
    //% inlineInputMode=inline
    //% group="Angle Servos"
    //% weight=85
    export function setGreyGeekservoAngle(servoNum: SERVO, degree: number): void {
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
        let minPulse = phase_width_period_microsec * 3 / 100
        let maxPulse = phase_width_period_microsec * 6 / 50
        let pulseWidth = degree_norm * phase_width_period_microsec * phaseRangePercent / 100 / degreeRange + minPulse
        pulseWidth = ux.inRange(pulseWidth, minPulse, maxPulse)
        setServoPulseWidth(servoNum, pulseWidth)
    }

    /**
     * Set LARGE Grey Geekservo angle
     * @param servoNum where servo is connected e.g.: Servo1
     * @param degree [0...360] angle in degrees e.g.: 0, 15, 30, 90, 180, 270, 360
    */
    //% block="LARGE grey Geekservo|connected to %servoNum|degree %degree"
    //% blockId="ux_setLargeGreyGeekservoAngle"
    //% degree.min=0 degree.max=360
    //% inlineInputMode=inline
    //% group="Angle Servos"
    //% weight=84
    export function setLargeGreyGeekservoAngle(servoNum: SERVO, degree: number): void {
        // 0deg: 512uS, 360deg: 2512uS, max: 2560us
        
        // Shift degrees to range [0,360]
        let degree_norm = (degree % 360)
        if (degree_norm < 0)
            degree_norm += 360

        let pulseWidth = degree_norm * phase_width_levels * 125 / 256 / 360 + (phase_width_levels / 8)
        pulseWidth = ux.inRange(pulseWidth, phase_width_levels / 8, phase_width_levels * 5 / 8)
        setServoPulseWidth(servoNum, pulseWidth)
    }
}
