# Alexa Universal Remote

The goal of this project is to create a universal IR remote control that can be managed by Amazon's Alexa AI. A set of possible events will be send by Alexa's skills API and handled by a nodejs server which translate them to IR pulses, the commands are then send to chosen devices using a small circuit wired to GPIO ports on the rapsberry pi 3.