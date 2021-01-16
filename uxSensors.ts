/**
 * microX support for sensors.
 */
//% block=uxSensors
//% color="#303030" weight=47 icon="\uf06e"
//% groups='["Distance", "Sound", "Line Trackers", "Light", "Proximity", "Gestures"]'
namespace uxSensors {

    let usedPrevDistance = false
    let prevDistance: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    function _ultrasonicDistance(pinNumber: ux.PinNumber, pullMode: PinPullMode, mult: number, div: number, attempt: number): number {
        let pin = ux.pinToDigitalPin(pinNumber)
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
    //% blockId="ux_ultrasonicDistanceCatShapedSensor"
    //% group="Distance"
    //% weight=79
    export function ultrasonicDistanceCatShapedSensor(pinNumber: ux.PinNumber): number {
        return _ultrasonicDistance(pinNumber, PinPullMode.PullDown, 21, 800, 0)
    }

    /**
     * Measure distance using Powerbrick's ultrasonic module
     * @param pinNumber digital pin number
     */
    //% block="Ultrasonic distance of Powerbrick module connected to|digital pin %pinNumber"
    //% blockId="ux_ultrasonicDistancePowerbrickUltrasonicModule"
    //% group="Distance"
    //% weight=81
    export function ultrasonicDistancePowerbrickUltrasonicModule(pinNumber: ux.PinNumber): number {
        return _ultrasonicDistance(pinNumber, PinPullMode.PullNone, 10, 348, 0)
    }

    /**
     * Measure sound level using Powerbrick's ultrasonic module
     * @param pinNumber analog pin number
     */
    //% block="Sound level of Powerbrick module connected to|analog pin %pinNumber"
    //% blockId="ux_soundLevelPowerbrickUltrasonicModule"
    //% group="Sound"
    //% weight=78
    export function soundLevelPowerbrickUltrasonicModule(pinNumber: ux.PinNumber): number {
        let pin = ux.pinToAnalogPin(pinNumber)
        if (pin == null)
            return 0
        return pins.analogReadPin(pin)
    }

    /**
     * Measure distance using Cat-head shaped sensor with LEDs in ears
     * @param pinNumber digital pin number
     */
    //% block="Ultrasonic distance of cat-sensor with LED-ears connected to|digital pin %pinNumber"
    //% blockId="ux_ultrasonicDistanceCatShapedSensorWithLeds"
    //% group="Distance"
    //% weight=76
    export function ultrasonicDistanceCatShapedSensorWithLeds(pinNumber: ux.PinNumber): number {
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
    //% blockId="ux_initializeLineTracker2Channels"
    //% group="Line Trackers"
    //% weight=75
    export function initializeLineTracker2Channels(ch1: ux.PinNumber, ch2: ux.PinNumber): void {
        pins.setPull(ux.pinToDigitalPin(ch1), PinPullMode.PullUp)
        pins.setPull(ux.pinToDigitalPin(ch2), PinPullMode.PullUp)
    }

    /**
     * Initializes a line tracker sensor with 3 channels connected to 3 specific digial pins
     * @param ch1 digital pin number
     * @param ch2 digital pin number
     * @param ch3 digital pin number
     */
    //% block="Initialize Line Tracker 3CH connected to|digial pin %ch1|digial pin %ch2|digial pin %ch3"
    //% blockId="ux_initializeLineTracker3Channels"
    //% group="Line Trackers"
    //% weight=74
    export function initializeLineTracker3Channels(ch1: ux.PinNumber, ch2: ux.PinNumber, ch3: ux.PinNumber): void {
        pins.setPull(ux.pinToDigitalPin(ch1), PinPullMode.PullUp)
        pins.setPull(ux.pinToDigitalPin(ch2), PinPullMode.PullUp)
        pins.setPull(ux.pinToDigitalPin(ch3), PinPullMode.PullUp)
    }

    /**
     * Get line position from 2 channel tracker
     * @param ch1 digital pin number
     * @param ch2 digital pin number
     */
    //% block="Get line position from 2 channel tracker connected to|digial pin %ch1|digial pin %ch2"
    //% blockId="ux_getLinePosition2Channels"
    //% group="Line Trackers"
    //% weight=73
    export function getLinePosition2Channels(ch1: ux.PinNumber, ch2: ux.PinNumber): string {
        ch1 = 1 - pins.digitalReadPin(ux.pinToDigitalPin(ch1))
        ch2 = 1 - pins.digitalReadPin(ux.pinToDigitalPin(ch2))
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
    //% blockId="ux_getLinePosition3Channels"
    //% group="Line Trackers"
    //% weight=72
    export function getLinePosition3Channels(ch1: ux.PinNumber, ch2: ux.PinNumber, ch3: ux.PinNumber): string {
        ch1 = 1 - pins.digitalReadPin(ux.pinToDigitalPin(ch1))
        ch2 = 1 - pins.digitalReadPin(ux.pinToDigitalPin(ch2))
        ch3 = 1 - pins.digitalReadPin(ux.pinToDigitalPin(ch3))
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
        ux.i2cwrite(KC_ADDR, KC_MODE, mode);
    }

    /**
     * Get brightness using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get brightness"
    //% blockId="ux_powerbrickGestureColorModuleGetBrightness"
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
    //% blockId="ux_powerbrickGestureColorModuleGetHue"
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
    //% blockId="ux_powerbrickGestureColorModuleGetRgb"
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
    //% blockId="ux_powerbrickGestureColorModuleSetLed"
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
    //% blockId="ux_powerbrickGestureColorModuleSetLeds"
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
    //% blockId="ux_powerbrickGestureColorModuleSetPwm"
    //% group="Proximity"
    //% weight=66
    export function powerbrickGestureColorModuleSetPwm(pwm: number): void {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Active)
        ux.i2cwrite(KC_ADDR, KC_LEDPWM, pwm);
    }

    function bool2Num(b: boolean): number {
        return b == true ? 1 : 0
    }

    /**
     * Get Proximity using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get proximity"
    //% blockId="ux_powerbrickGestureColorModuleGetProximity"
    //% group="Proximity"
    //% weight=65
    export function powerbrickGestureColorModuleGetProximity(): number {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Proximity)
        return ux.i2cread(KC_ADDR, KC_PROXIMITY)
    }

    /**
     * Get gesture using Powerbrick Gesture+Color sensor
     */
    //% block="Powerbrick Gesture+Color get gesture"
    //% blockId="ux_powerbrickGestureColorModuleGetGesture"
    //% group="Gestures"
    //% weight=64
    export function powerbrickGestureColorModuleGetGesture(): number {
        powerbrickGestureColorModuleSetMode(PowerbrickGestureColorSensorMode.Gesture)
        return ux.i2cread(KC_ADDR, KC_GESTURE)
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
