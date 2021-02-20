/**
 * Powerbrick example
 */

// Initialization for motors and servos
uxMotion.initializePhaseWidthModulationDriver()

// Powerbrick display example
uxDisplays.intializePowerbrickPixels(ux.PinNumber.PowerbrickPort3_DigitalA)

uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.Servo.PowerbrickServo1, 0)
uxMotion.setGreyGeekservoAngle(uxMotion.Servo.PowerbrickServo2, 0)
uxMotion.setLargeGreyGeekservoAngle(uxMotion.Servo.PowerbrickServo3, 0)
uxMotion.setServoPulseWidth(uxMotion.Servo.PowerbrickServo4, 0)

// Sensor and motion example
basic.forever(function () {
    let distance = uxSensors.ultrasonicDistancePowerbrickUltrasonicModule(ux.PinNumber.PowerbrickPort2_DigitalA)
    if (distance < 5) {
        uxMotion.setMotor(uxMotion.Motor.PowerbrickM1, -4095)
        uxMotion.setMotor(uxMotion.Motor.PowerbrickM2, -4095)
        uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.Servo.PowerbrickServo1, -1024)
        uxMotion.setGreyGeekservoAngle(uxMotion.Servo.PowerbrickServo2, 225)
        uxMotion.setLargeGreyGeekservoAngle(uxMotion.Servo.PowerbrickServo3, 360)
        uxMotion.setServoPulseWidth(uxMotion.Servo.PowerbrickServo4, 2646)
    }
    else if (distance < 10) {
        uxDisplays.setPowerbrickAllPixels(128, 0, 0)
        uxDisplays.refreshPowerbrickPixels()
    } else {
        uxMotion.setMotor(uxMotion.Motor.PowerbrickM1, 4095)
        uxMotion.setMotor(uxMotion.Motor.PowerbrickM2, 4095)
        uxDisplays.setPowerbrickAllPixels(10, 0, 0)
        uxDisplays.refreshPowerbrickPixels()
    }
})
