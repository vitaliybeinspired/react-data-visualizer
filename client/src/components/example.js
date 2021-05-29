import React from "react"
import ReactCountryFlag from "react-country-flag"

export default class ExampleComponent extends React.Component {
    render() {
        return (
            <div>
                {/* <ReactCountryFlag countryCode="US" />

                <ReactCountryFlag countryCode="US" svg /> */}

                <ReactCountryFlag
                    className="emojiFlag"
                    countryCode={this.props.country}
                    svg
                    style={{
                        width: '2em',
                        height: '2em',
                        borderRadius: "1em"
                    }}
                />

                {/* <ReactCountryFlag
                    countryCode="US"
                    svg
                    style={{
                        width: '2em',
                        height: '2em',
                    }}
                    title="US"
                /> */}

                {/* <ReactCountryFlag
                    countryCode="US"
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                    cdnSuffix="svg"
                    title="US"
                /> */}
            </div>
        )
    }
}