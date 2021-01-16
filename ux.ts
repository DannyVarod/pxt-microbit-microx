/**
 * ux (short for microX) - Extensions for various hardware include remotes, motors, servos, sensors etc.
 * If you want support for you hardware added to here, post me the hardware for me to test and use
 * and then either wait for me to have time to learn to use it, or submit a pull request with your code changes.
 */
//% block=ux
//% color="#303030" weight=50 icon="\uf0e7"
//% groups='["Remotes", "Motion", "Sensors", "Displays", "MP3"]'
namespace ux {
    
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
