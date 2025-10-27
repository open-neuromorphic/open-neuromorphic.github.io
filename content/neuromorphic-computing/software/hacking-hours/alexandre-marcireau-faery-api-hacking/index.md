---
title: "Alexandre Marcireau: Faery API Hacking"
author:
  - "Alexandre Marcireau"
  - "Jens E. Pedersen"
date: 2024-10-29
description: "A deep dive into hacking and extending the Faery API with Alexandre Marcireau and host Jens E. Pedersen."
upcoming: false
video: "bkwC0ygMous"
image: "alexandre-marcireau-faery-api-hacking.jpg"
type: "hacking-hours"
software_tags: ["faery"]
---

This Hacking Hour features Alexandre Marcireau, who, along with host Jens E. Pedersen, dives deep into the Faery event processing library. The session focuses on practical API hacking, exploring how to extend and customize Faery for specific neuromorphic data processing tasks.

The discussion centered on enhancing the Faery API, particularly concerning MP4 conversion and CLI improvements.

## Main Themes

*   **Converting Event Streams to MP4 and Image Sequences:** A core focus was building robust functionality within Faery to transform raw event data into visual formats, specifically MP4 videos and sequences of PNG images. This involves handling the inherent differences between event streams (arbitrary duration packets) and video frames (fixed duration).
*   **Regularization and Frame Rate Control:** A significant part of the discussion revolved around "regularizing" event streams into fixed-duration packets, which then correspond to video frames. This process allows for controlling the temporal aspects of the output video, including creating slow motion or sped-up effects.
*   **API Design and Composability:** The importance of a well-designed and composable API was highlighted. Standalone functions for specific operations (like adding timecodes) were favored over integrating them directly into larger functions (like `to_file`), promoting flexibility and modularity.
*   **Data Representation for Frames:** Different data formats for representing frames were discussed, including RGB and a unique floating-point representation that preserves information about both 'on' and 'off' events using the sign bit. The potential benefits and drawbacks of these formats, particularly in the context of GPU processing, were explored.
*   **CLI Development and User Experience:** The later part of the discussion focused on improving the Faery CLI to make it more user-friendly and powerful. A new block-based parsing approach was proposed to handle complex pipelines with multiple inputs, outputs, and filters in a clear and structured manner.
*   **Integration with External Protocols (UDP/Spinnaker):** The potential for integrating Faery with external event protocols like Spinnaker's spifferella protocol via UDP was discussed, highlighting the challenges of handling variable time stamps and aligning Faery's processing speed with real-time data streams.

## Most Important Ideas/Facts

*   **Distinction between Event Streams and Regular Event Streams:** The Faery API introduces two distinct types to handle event data:
  *   An "event stream" (from cameras/files with arbitrary packet durations and event counts).
  *   A "regular event stream" (where packets have a guaranteed, user-defined duration).
*   **`regularize` Operator:** A key operator, `regularize`, is introduced to convert an event stream into a regular event stream. This operator is crucial for preparing data for video conversion, allowing users to specify the desired packet frequency (e.g., 60 Hz for 60 packets per second).
    > "...this operator here `regularize` takes a even stream with packets of arbitrary durations uh and turns it into a stream where the packets have a given duration and you can choose that duration uh and now you can choose it as a frequency so 60 HZ means that I want to have exactly 60 packets per second and each packet is going to cover exactly one of 60 seconds..."
*   **`to_file` and `to_files` Functions:**
  *   `to_file`: Used for saving a regular frame stream to a video file (e.g., MP4). It has an optional `frequency_hertz` parameter that determines the video's frame rate.
  *   `to_files`: Used for saving a regular frame stream as a sequence of individual image files (e.g., PNGs). This generates one image file per frame packet.
    > "...so `to_files` actually to save a collection of pngs from the frame stream..."
*   **Controlling Video Speed:** The relationship between the `regularize` frequency and the `to_file` frame rate allows for controlling the video's playback speed.
  *   If `regularize` frequency > `to_file` frame rate, the video will be slow motion.
  *   If `regularize` frequency < `to_file` frame rate, the video will be sped up.
    > "...so basically every time your the value in `regularize` is larger than the value in `to_file` I'll end up with a slow machine video okay yeah if that makes any sense..."
*   **`add_time_code` Function:** A standalone function exists to add a timecode overlay to the frames. This function can automatically calculate and display the real-time or speed-up factor based on the pipeline's configuration. The design favors this as a separate, composable filter.
    > "...what I do like with the standal in function is that things are very composable because the uh output of this is still a frame stream right so I could feasibly decide to scale again exactly after adding the time code and SC with the time code right exactly because it's..."
*   **Frame Data Formats:**
  *   **RGB 8888:** The typical RGB plus transparency format.
  *   **Floating Point (Envelope Output):** A specific format produced by the `envelope` function. Each pixel has a floating-point value where the sign indicates whether it originated from an 'on' (positive) or 'off' (negative) event, and the magnitude represents decay. This format is designed to preserve information and potentially be efficient for GPU processing with diverging colormaps.
    > "...The other one is a bit weirder... It is a frame made of floating Point values... the idea was to preserve the information by simply using the sign of that value... positive values represent an nonevent and negative values represent off even..."
*   **Decay Models:** The `envelope` function supports different decay models (exponential, linear, window) for how events contribute to the frame pixel values. Leaky Integrate and Fire (LIF) neurons were discussed but not implemented for simplicity and bounded output requirements for color representation.
*   **New CLI Design:** A block-based parsing approach is being developed for the CLI. Commands are structured using keywords like `input`, `output`, and `filter`, with parameters following each keyword. This approach aims for verbosity and clarity.
    > "...the way I've done it is slightly hacky but it doesn't rely on any external libraries it means that we are simply taking all the arguments in the command line right and we matching is it either input output or filter and whenever we see those keywords we start a new block so to speak..."
*   **Dynamic Filter Loading in CLI:** The plan is to dynamically load available filters in the CLI by inspecting the Faery codebase at startup, avoiding the need to manually list all filters in the CLI code.
*   **Spinnaker/Spifferella Protocol Integration:** Discussion on reintroducing support for the spifferella protocol via UDP. Challenges include handling optional time stamps and the difference between Faery's fast processing and the real-time expectations of some hardware. An issue has been created to reintroduce and test this functionality.

## Key Decisions and Next Steps

*   Change the parameter name `frequency` to `frame_rate` or `FPS` in video output functions to clearly distinguish it from the regularization frequency.
*   Keep the `add_time_code` function as a standalone, composable filter.
*   Initially support only one `input` and one `output` block in the new CLI for simplicity, potentially adding support for multiple inputs/outputs later if a clear use case emerges and doesn't add undue complexity.
*   Implement the new block-based CLI parsing with a focus on clarity and leveraging `argparse` internally for parameter handling within each block.
*   Automate the loading of filters in the CLI using code inspection, while keeping inputs and outputs manually defined due to potential differences between API and CLI behavior.
*   Reintroduce and test the spifferella UDP protocol support.

## Areas for Further Discussion/Development

*   Adding support for variable frame rates in video output.
*   Exploring a two-channel representation for frames to potentially better handle simultaneous 'on' and 'off' events in time-aggregated data, particularly for GPU processing.
*   Optimizing the floating-point frame representation (e.g., using 32-bit instead of 64-bit floats).
*   Implementing `fairy init` and `fairy run` commands in the new CLI.
*   Investigating issues with reading Faery-generated `.aedat` and `raw` files in external software (DV, Prophecy software).

This session provided a high-level overview of the technical discussions and planned developments within the Faery API, highlighting the progress being made towards powerful video conversion and a more user-friendly command-line interface.
