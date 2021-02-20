/**
 * Robotbit example
 */

// Initialization for motors and servos
uxMotion.initializePhaseWidthModulationDriver()

// Initialization for LEDs
uxDisplays.intializeRobotbitPixels()

uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.Servo.RobotbitServo1, 0)
uxMotion.setGreyGeekservoAngle(uxMotion.Servo.RobotbitServo2, 0)
uxMotion.setLargeGreyGeekservoAngle(uxMotion.Servo.RobotbitServo3, 0)
uxMotion.setServoPulseWidth(uxMotion.Servo.RobotbitServo4, 0)

// Sensor and motion example
basic.forever(function () {
    let distance = uxSensors.ultrasonicDistanceCatShapedSensor(ux.PinNumber.Pin10)
    if (distance < 5) {
        uxMotion.setMotor(uxMotion.Motor.RobotbitM1A, -4095)
        uxMotion.setMotor(uxMotion.Motor.RobotbitM1B, -4095)
        uxMotion.setOrangeGreenGeekservoSpeed(uxMotion.Servo.RobotbitServo1, -1024)
        uxMotion.setGreyGeekservoAngle(uxMotion.Servo.RobotbitServo2, 225)
        uxMotion.setLargeGreyGeekservoAngle(uxMotion.Servo.RobotbitServo3, 360)
        uxMotion.setServoPulseWidth(uxMotion.Servo.RobotbitServo4, 2646)
    }
    else if (distance < 10) {
        uxDisplays.setRobotbitAllPixels(128, 0, 0)
        uxDisplays.refreshRobotbitPixels()
    } else {
        uxMotion.setMotor(uxMotion.Motor.RobotbitM1A, 4095)
        uxMotion.setMotor(uxMotion.Motor.RobotbitM1B, 4095)
        uxDisplays.setRobotbitAllPixels(10, 0, 0)
        uxDisplays.refreshRobotbitPixels()
    }
})
