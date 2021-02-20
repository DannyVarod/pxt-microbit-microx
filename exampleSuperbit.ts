/**
 * Superbit example
 */

// Initialization for motors and servos
uxMotion.initializePhaseWidthModulationDriver()

// Initialization for LEDs
uxDisplays.intializeSuperbitPixels()

uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.Servo.SuperbitServo1, 0)
uxMotion.setGreyGeekservoAngle(uxMotion.Servo.SuperbitServo2, 0)
uxMotion.setLargeGreyGeekservoAngle(uxMotion.Servo.SuperbitServo3, 0)
uxMotion.setServoPulseWidth(uxMotion.Servo.SuperbitServo4, 0)

// Sensor and motion example
basic.forever(function () {
    let distance = uxSensors.ultrasonicDistanceCatShapedSensor(ux.PinNumber.Pin10)
    if (distance < 5) {
        uxMotion.setMotor(uxMotion.Motor.SuperbitM1, -4095)
        uxMotion.setMotor(uxMotion.Motor.SuperbitM2, -4095)
        uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.Servo.SuperbitServo1, -1024)
        uxMotion.setGreyGeekservoAngle(uxMotion.Servo.SuperbitServo2, 225)
        uxMotion.setLargeGreyGeekservoAngle(uxMotion.Servo.SuperbitServo3, 360)
        uxMotion.setServoPulseWidth(uxMotion.Servo.SuperbitServo4, 2646)
    }
    else if (distance < 10) {
        uxDisplays.setSuperbitAllPixels(128, 0, 0)
        uxDisplays.refreshSuperbitPixels()
    } else {
        uxMotion.setMotor(uxMotion.Motor.SuperbitM1, 4095)
        uxMotion.setMotor(uxMotion.Motor.SuperbitM2, 4095)
        uxDisplays.setSuperbitAllPixels(10, 0, 0)
        uxDisplays.refreshSuperbitPixels()
    }
})
