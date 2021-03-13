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
        //% block="pin0"
        PIN0 = 0,
        //% block="pin1"
        PIN1 = 1,
        //% block="pin2"
        PIN2 = 2,
        //% block="pin3"
        PIN3 = 3,
        //% block="pin4"
        PIN4 = 4,
        //% block="pin6"
        PIN6 = 6,
        //% block="pin7"
        PIN7 = 7,
        //% block="pin8"
        PIN8 = 8,
        //% block="pin9"
        PIN9 = 9,
        //% block="pin10"
        PIN10 = 10,
        //% block="pin12"
        PIN12 = 12,
        //% block="pin13"
        PIN13 = 13,
        //% block="pin14"
        PIN14 = 14,
        //% block="pin15"
        PIN15 = 15,
        //% block="pin16"
        PIN16 = 16,

        //% block="analog pin0"
        AnalogPin0 = PIN0,
        //% block="analog pin1"
        AnalogPin1 = PIN1,
        //% block="analog pin2"
        AnalogPin2 = PIN2,
        //% block="analog pin3"
        AnalogPin3 = PIN3,
        //% block="analog pin4"
        AnalogPin4 = PIN4,
        //% block="analog pin10"
        AnalogPin10 = PIN10,

        //% block="powerbrick port1.a"
        PowerbrickPort1A = PIN0,
        //% block="powerbrick port1.b"
        PowerbrickPort1B = PIN8,
        //% block="powerbrick port2.a"
        PowerbrickPort2A = PIN1,
        //% block="powerbrick port2.b"
        PowerbrickPort2B = PIN12,
        //% block="powerbrick port3.a"
        PowerbrickPort3A = PIN2,
        //% block="powerbrick port3.b"
        PowerbrickPort3B = PIN13,
        //% block="powerbrick port4.a"
        PowerbrickPort4A = PIN14,
        //% block="powerbrick port4.b"
        PowerbrickPort4B = PIN15,
        //% block="powerbrick port5.a"
        PowerbrickPort5A = PIN3,
        //% block="powerbrick port5.b"
        PowerbrickPort5B = PIN6,
        //% block="powerbrick port6.a"
        PowerbrickPort6A = PIN4,
        //% block="powerbrick port6.b"
        PowerbrickPort6B = PIN7,
        //% block="powerbrick port7.a"
        PowerbrickPort7A = PIN10,
        //% block="powerbrick port7.b"
        PowerbrickPort7B = PIN9,

        //% block="powerbrick port1 digital.a"
        PowerbrickPort1_DigitalA = PIN0,
        //% block="powerbrick port1 digital.b"
        PowerbrickPort1_DigitalB = PIN8,
        //% block="powerbrick port2 digital.a"
        PowerbrickPort2_DigitalA = PIN1,
        //% block="powerbrick port2 digital.b"
        PowerbrickPort2_DigitalB = PIN12,
        //% block="powerbrick port3 digital.a"
        PowerbrickPort3_DigitalA = PIN2,
        //% block="powerbrick port3 digital.b"
        PowerbrickPort3_DigitalB = PIN13,
        //% block="powerbrick port4 digital.a"
        PowerbrickPort4_DigitalA = PIN14,
        //% block="powerbrick port4 digital.b"
        PowerbrickPort4_DigitalB = PIN15,
        //% block="powerbrick port5 digital.a"
        PowerbrickPort5_DigitalA = PIN3,
        //% block="powerbrick port5 digital.b"
        PowerbrickPort5_DigitalB = PIN6,
        //% block="powerbrick port6 digital.a"
        PowerbrickPort6_DigitalA = PIN4,
        //% block="powerbrick port6 digital.b"
        PowerbrickPort6_DigitalB = PIN7,
        //% block="powerbrick port7 digital.a"
        PowerbrickPort7_DigitalA = PIN10,
        //% block="powerbrick port7 digital.b"
        PowerbrickPort7_DigitalB = PIN9,

        //% block="powerbrick port1 analog"
        PowerbrickPort1_Analog = PIN0,
        //% block="powerbrick port2 analog"
        PowerbrickPort2_Analog = PIN1,
        //% block="powerbrick port3 analog"
        PowerbrickPort3_Analog = PIN2,
        //% block="powerbrick port5 analog"
        PowerbrickPort5_Analog = PIN3,
        //% block="powerbrick port6 analog"
        PowerbrickPort6_Analog = PIN4,
        //% block="powerbrick port7 analog"
        PowerbrickPort7_Analog = PIN10,

        //% block="powerbrick port1 serial.a"
        PowerbrickPort1_SerialA = PIN0,
        //% block="powerbrick port1 serial.b"
        PowerbrickPort1_SerialB = PIN8,
        //% block="powerbrick port2 serial.a"
        PowerbrickPort2_SerialA = PIN1,
        //% block="powerbrick port2 serial.b"
        PowerbrickPort2_SerialB = PIN12,
        //% block="powerbrick port3 serial.a"
        PowerbrickPort3_SerialA = PIN2,
        //% block="powerbrick port3 serial.b"
        PowerbrickPort3_SerialB = PIN13,
        //% block="powerbrick port4 serial.a"
        PowerbrickPort4_SerialA = PIN14,
        //% block="powerbrick port4 serial.b"
        PowerbrickPort4_SerialB = PIN15,
        //% block="powerbrick port7 serial.a"
        PowerbrickPort7_SerialA = PIN10,
        //% block="powerbrick port7 serial.b"
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
