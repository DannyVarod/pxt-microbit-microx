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
     * Pin Number
     */
    export enum PIN_NUMBER {
        //% block=Pin0
        PIN0 = 0,
        //% block=Pin1
        PIN1 = 1,
        //% block=Pin2
        PIN2 = 2,
        //% block=Pin3
        PIN3 = 3,
        //% block=Pin4
        PIN4 = 4,
        //% block=Pin6
        PIN6 = 6,
        //% block=Pin7
        PIN7 = 7,
        //% block=Pin8
        PIN8 = 8,
        //% block=Pin9
        PIN9 = 9,
        //% block=Pin10
        PIN10 = 10,
        //% block=Pin12
        PIN12 = 12,
        //% block=Pin13
        PIN13 = 13,
        //% block=Pin14
        PIN14 = 14,
        //% block=Pin15
        PIN15 = 15,
        //% block=Pin16
        PIN16 = 16,

        //% block=AnalogPin0
        AnalogPin0 = PIN0,
        //% block=AnalogPin1
        AnalogPin1 = PIN1,
        //% block=AnalogPin2
        AnalogPin2 = PIN2,
        //% block=AnalogPin3
        AnalogPin3 = PIN3,
        //% block=AnalogPin4
        AnalogPin4 = PIN4,
        //% block=AnalogPin10
        AnalogPin10 = PIN10,

        //% block=PowerbrickPort1A
        PowerbrickPort1A = PIN0,
        //% block=PowerbrickPort1B
        PowerbrickPort1B = PIN8,
        //% block=PowerbrickPort2A
        PowerbrickPort2A = PIN1,
        //% block=PowerbrickPort2B
        PowerbrickPort2B = PIN12,
        //% block=PowerbrickPort3A
        PowerbrickPort3A = PIN2,
        //% block=PowerbrickPort3B
        PowerbrickPort3B = PIN13,
        //% block=PowerbrickPort4A
        PowerbrickPort4A = PIN14,
        //% block=PowerbrickPort4B
        PowerbrickPort4B = PIN15,
        //% block=PowerbrickPort5A
        PowerbrickPort5A = PIN3,
        //% block=PowerbrickPort5B
        PowerbrickPort5B = PIN6,
        //% block=PowerbrickPort6A
        PowerbrickPort6A = PIN4,
        //% block=PowerbrickPort6B
        PowerbrickPort6B = PIN7,
        //% block=PowerbrickPort7A
        PowerbrickPort7A = PIN10,
        //% block=PowerbrickPort7B
        PowerbrickPort7B = PIN9,

        //% block=PowerbrickPort1_DigitalA
        PowerbrickPort1_DigitalA = PIN0,
        //% block=PowerbrickPort1_DigitalB
        PowerbrickPort1_DigitalB = PIN8,
        //% block=PowerbrickPort2_DigitalA
        PowerbrickPort2_DigitalA = PIN1,
        //% block=PowerbrickPort2_DigitalB
        PowerbrickPort2_DigitalB = PIN12,
        //% block=PowerbrickPort3_DigitalA
        PowerbrickPort3_DigitalA = PIN2,
        //% block=PowerbrickPort3_DigitalB
        PowerbrickPort3_DigitalB = PIN13,
        //% block=PowerbrickPort4_DigitalA
        PowerbrickPort4_DigitalA = PIN14,
        //% block=PowerbrickPort4_DigitalB
        PowerbrickPort4_DigitalB = PIN15,
        //% block=PowerbrickPort5_DigitalA
        PowerbrickPort5_DigitalA = PIN3,
        //% block=PowerbrickPort5_DigitalB
        PowerbrickPort5_DigitalB = PIN6,
        //% block=PowerbrickPort6_DigitalA
        PowerbrickPort6_DigitalA = PIN4,
        //% block=PowerbrickPort6_DigitalB
        PowerbrickPort6_DigitalB = PIN7,
        //% block=PowerbrickPort7_DigitalA
        PowerbrickPort7_DigitalA = PIN10,
        //% block=PowerbrickPort7_DigitalB
        PowerbrickPort7_DigitalB = PIN9,

        //% block=PowerbrickPort1_Analog
        PowerbrickPort1_Analog = PIN0,
        //% block=PowerbrickPort2_Analog
        PowerbrickPort2_Analog = PIN1,
        //% block=PowerbrickPort3_Analog
        PowerbrickPort3_Analog = PIN2,
        //% block=PowerbrickPort5_Analog
        PowerbrickPort5_Analog = PIN3,
        //% block=PowerbrickPort6_Analog
        PowerbrickPort6_Analog = PIN4,
        //% block=PowerbrickPort7_Analog
        PowerbrickPort7_Analog = PIN10,

        //% block=PowerbrickPort1_SerialA
        PowerbrickPort1_SerialA = PIN0,
        //% block=PowerbrickPort1_SerialB
        PowerbrickPort1_SerialB = PIN8,
        //% block=PowerbrickPort2_SerialA
        PowerbrickPort2_SerialA = PIN1,
        //% block=PowerbrickPort2_SerialB
        PowerbrickPort2_SerialB = PIN12,
        //% block=PowerbrickPort3_SerialA
        PowerbrickPort3_SerialA = PIN2,
        //% block=PowerbrickPort3_SerialB
        PowerbrickPort3_SerialB = PIN13,
        //% block=PowerbrickPort4_SerialA
        PowerbrickPort4_SerialA = PIN14,
        //% block=PowerbrickPort4_SerialB
        PowerbrickPort4_SerialB = PIN15,
        //% block=PowerbrickPort7_SerialA
        PowerbrickPort7_SerialA = PIN10,
        //% block=PowerbrickPort7_SerialB
        PowerbrickPort7_SerialB = PIN9
    }

    export function pinToDigitalPin(pinNumber: PIN_NUMBER): DigitalPin {
        switch (pinNumber) {
            case PIN_NUMBER.PIN0: return DigitalPin.P0
            case PIN_NUMBER.PIN1: return DigitalPin.P1
            case PIN_NUMBER.PIN2: return DigitalPin.P2
            case PIN_NUMBER.PIN3: return DigitalPin.P3
            case PIN_NUMBER.PIN4: return DigitalPin.P4
            case PIN_NUMBER.PIN6: return DigitalPin.P6
            case PIN_NUMBER.PIN7: return DigitalPin.P7
            case PIN_NUMBER.PIN8: return DigitalPin.P8
            case PIN_NUMBER.PIN9: return DigitalPin.P9
            case PIN_NUMBER.PIN10: return DigitalPin.P10
            case PIN_NUMBER.PIN12: return DigitalPin.P12
            case PIN_NUMBER.PIN13: return DigitalPin.P13
            case PIN_NUMBER.PIN14: return DigitalPin.P14
            case PIN_NUMBER.PIN15: return DigitalPin.P15
            case PIN_NUMBER.PIN16: return DigitalPin.P16
            default: return null
        }
    }

    export function pinToSerialPin(pinNumber: PIN_NUMBER): SerialPin {
        switch (pinNumber) {
            case PIN_NUMBER.PIN0: return SerialPin.P0
            case PIN_NUMBER.PIN1: return SerialPin.P1
            case PIN_NUMBER.PIN2: return SerialPin.P2
            case PIN_NUMBER.PIN8: return SerialPin.P8
            case PIN_NUMBER.PIN12: return SerialPin.P12
            case PIN_NUMBER.PIN13: return SerialPin.P13
            case PIN_NUMBER.PIN14: return SerialPin.P14
            case PIN_NUMBER.PIN15: return SerialPin.P15
            case PIN_NUMBER.PIN16: return SerialPin.P16
            default: return null
        }
    }

    export function pinToAnalogPin(pinNumber: PIN_NUMBER): AnalogPin {
        switch (pinNumber) {
            case PIN_NUMBER.PIN0: return AnalogPin.P0
            case PIN_NUMBER.PIN1: return AnalogPin.P1
            case PIN_NUMBER.PIN2: return AnalogPin.P2
            case PIN_NUMBER.PIN3: return AnalogPin.P3
            case PIN_NUMBER.PIN4: return AnalogPin.P4
            case PIN_NUMBER.PIN10: return AnalogPin.P10
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
