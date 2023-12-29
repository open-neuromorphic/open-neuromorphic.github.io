# Import the necessary modules
import plotly.express as px
import plotly.graph_objects as go

# Assuming you have already defined the 'frameworks' and 'df' variables
frameworks = df['framework'].unique()

# Define a function to create the bar chart
def get_figure(df, rounding=2, title=""):
    totals = df["time [s]"][df["pass"] == "forward"].to_numpy() + df["time [s]"][df["pass"] == "backward"].to_numpy()
    fig = px.bar(
        df,
        y="framework",
        x="time [s]",
        color="pass",
        log_x=True,
        text_auto=f'.{rounding}f',
        orientation='h',
    ).add_trace(go.Scatter(
        y=frameworks, x=totals*1.05,
        mode='text',
        text=totals.round(rounding),
        textposition='middle right',
        showlegend=False
    ))
    fig.data[0]['textposition'] = 'inside'
    fig.data[1]['textposition'] = 'inside'

    fig.update_layout(
        title=title,
        yaxis={'categoryorder':'total descending'},
        legend=dict(orientation="h", yanchor="bottom", y=1.01, xanchor="right", x=1),
        margin=dict(l=0, r=20, t=70, b=10),
        yaxis_title="",
    )
    # Increase the size of facet titles
    fig.update_annotations(font_size=14)
    return fig

# Call the function to create the bar chart
get_figure(df, rounding=2, title="Your Chart Title")
