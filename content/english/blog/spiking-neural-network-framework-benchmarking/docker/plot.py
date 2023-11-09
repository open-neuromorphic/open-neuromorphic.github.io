import pandas as pd
import os
import argparse

df = pd.read_csv("../data.csv")

os.makedirs("./fig", exist_ok=True)

##############

df["total"] = df["forward"] + df["backward"]
df["memory"] = df["memory"] * 1e-9  # convert to GB
df["framework"] = df["framework"].str.replace("<br>", " ")
df["framework"] = df["framework"].str.replace(
    "SpikingJelly CuPy v0.0.0.0.15", "SpikingJelly CuPy<br>v0.0.15"
)
df["framework"] = df["framework"].str.replace(
    "SpikingJelly PyTorch v0.0.0.0.15", "SpikingJelly PyTorch<br>v0.0.15"
)
df["framework"] = df["framework"].str.replace(
    "Spyx half-precision v0.1.10", "Spyx (float16) v0.1.10"
)
df["framework"] = df["framework"].str.replace(
    "Spyx full-precision v0.1.10", "Spyx (float32) v0.1.10"
)
df["framework"] = df["framework"].str.replace("Rockpool EXODUS", "Rockpool EXODUS<br>")
df["framework"] = df["framework"].str.replace("Sinabs EXODUS", "Sinabs EXODUS<br>")

###############

import plotly.express as px
import plotly.graph_objects as go

frameworks = df["framework"].unique()


def get_runtime_figure(df, rounding=2, title=""):
    fig = px.bar(
        df,
        y="framework",
        # x=["forward", "backward"],
        x="total",
        log_x=True,
        text_auto=f".{rounding}f",
        orientation="h",
        # ).add_trace(
        #     go.Scatter(
        #         y=frameworks,
        #         x=df["total"].to_numpy() * 1.05,
        #         mode="text",
        #         text=df["total"].round(rounding),
        #         textposition="middle right",
        #         showlegend=False,
        #     )
        range_x=(0.01, df["total"].max() * 1.2),
    )

    fig.update_layout(
        title=title,
        yaxis={"categoryorder": "total descending"},
        legend=dict(orientation="h", yanchor="bottom", y=1.01, xanchor="right", x=1),
        margin=dict(l=0, r=20, t=70, b=10),
        yaxis_title="",
        xaxis_title="Time (s)",
    )
    # increase size of facet titles
    fig.update_annotations(font_size=16)
    return fig


def get_memory_figure(df, rounding=2, title=""):
    df = df[df["framework"].str.contains("Spyx") == False]
    fig = px.bar(
        df,
        y="framework",
        x="memory",
        # log_x=True,
        text_auto=f".{rounding}f",
        orientation="h",
        range_x=(0.01, df["memory"].max() * 1.2),
    )

    fig.update_layout(
        title=title,
        yaxis={"categoryorder": "total descending"},
        margin=dict(l=0, r=20, t=70, b=10),
        yaxis_title="",
        xaxis_title="Max memory usage (GB)",
    )
    # increase size of facet titles
    fig.update_annotations(font_size=16)
    return fig


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch_size", action="store", default=None, required=False)
    args = parser.parse_args()
    batch_str = (
        f", batch size of {args.batch_size}" if args.batch_size is not None else ""
    )

    ###################

    df16k = df[df["neurons"] == 16384]

    fig = get_runtime_figure(
        df16k, title=f"Forward + backward pass latency on GPU for 16k neurons, lower is better{batch_str}"
    )

    fig.write_json("./fig/framework-benchmarking-16k.json")
    fig.write_image("./fig/framework-benchmarking-16k.png", width=1024)  # scale=2)
    fig.show()

    fig = get_memory_figure(
        df16k, title=f"Maximum GPU memory usage during latency benchmark for 16k neurons, lower is better{batch_str}"
    )

    fig.write_json("./fig/framework-benchmarking-mem-16k.json")
    fig.write_image("./fig/framework-benchmarking-mem-16k.png", width=1024)
    fig.show()



    # ####################

    # df8k = df[df["neurons"] == 8192]

    # fig = get_runtime_figure(
    #     df8k, title=f"Latency for 8k neurons, lower is better{batch_str}"
    # )

    # fig.write_json("./fig/framework-benchmarking-8k.json")
    # fig.write_image("./fig/framework-benchmarking-8k.png", width=1024)
    # fig.show()

    # fig = get_memory_figure(df8k, title="Memory use for 8k neurons, lower is better")

    # fig.write_json("./fig/framework-benchmarking-mem-8k.json")
    # fig.write_image("./fig/framework-benchmarking-mem-8k.png", width=1024)
    # fig.show()

    # ###################

    # df4k = df[df["neurons"] == 4096]

    # fig = get_runtime_figure(
    #     df4k, title=f"Latency for 4k neurons, lower is better{batch_str}"
    # )

    # fig.write_json("./fig/framework-benchmarking-4k.json")
    # fig.write_image("./fig/framework-benchmarking-4k.png", width=1024)  # scale=2)
    # fig.show()

    # fig = get_memory_figure(df4k, title="Memory use for 4k neurons, lower is better")

    # fig.write_json("./fig/framework-benchmarking-mem-4k.json")
    # fig.write_image("./fig/framework-benchmarking-mem-4k.png", width=1024)
    # fig.show()
