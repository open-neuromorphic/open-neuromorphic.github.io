## Operating principle

Event cameras are the most widespread type of neuromorphic vision sensor. Their pixels contain dedicated circuits to detect sudden changes in illuminance. Event camera only report these changes, hence their output consists of a stream of events where each event contains a timestamp (typically in microseconds), the coordinates of the pixel that detected a change, and the _polarity_ of the change (ON if the illuminance increased, OFF if the illuminance decreased).

The first commercial event camera was the (now discontinued) DVS 128 (TODO link to dvs128 on ONM). A 128× 128 120 dB 15 μs Latency Asynchronous Temporal Contrast Vision Sensor: https://doi.org/10.1109/JSSC.2007.914337
