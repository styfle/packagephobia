import * as React from 'react';
import { getReadableFileSize } from '../util/npm-parser';
const stylesheet = `
.bar-graph{
    height:45vh;
    padding-bottom:10vh;
    display:flex;
    align-items:baseline;
    margin:0;
    justify-content:center;
    max-width: 80vw;
    overflow-x: auto;
}
.bar-graph__bar-group{
    height:100%;
    position:relative;
    width:1.6vw;
    min-width:15px;
    margin:0 5px
}
.bar-graph__bar,.bar-graph__bar2{
    width:100%;
    position:absolute;
    left:0;
    bottom:0;
    transition:background 0.2s;
    animation:grow 0.4s cubic-bezier(0.305,0.42,0.205,1.2);
    transform-origin:100% 100%;
    cursor:pointer
}
.color1 {
    background: #32DE85;
}
.color2 {
    background: #26A664;
}
.bar-graph__bar-group--disabled .bar-graph__bar{
    background:#dfe1e4
}
.bar-graph__bar2{
    z-index:1;
    pointer-events:none
}
.bar-graph__bar:hover, .bar-graph__bar2:hover{
    box-shadow: inset 0 0 10px 10px rgba(0, 0, 0, 0.1);
}
.bar-graph__bar-version{
    font-size:0.8rem;
    position:absolute;
    bottom:-50px;
    font-weight:400;
    display:block;
    transform:rotate(-90deg);
    transform-origin:50% 50%;
    width:100%;
    text-align:right;
    font-variant-numeric:tabular-nums;
    color:#666E78;
    transition:opacity 0.2s,color 0.2s;
    animation:fade-in 0.5s 0.1s forwards cubic-bezier(0.305,0.42,0.205,1.2);
    font-family:"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
    letter-spacing:-1px
}
@media screen and (max-width:48em){
    .bar-graph__bar-version{
        font-size:0.75rem
    }
}
@media screen and (max-width:40em){
    .bar-graph__bar-version{
        font-size:0.7rem
    }
}
.bar-graph-container:hover .bar-graph__bar-version{
    opacity:1;
    color:black
}
.bar-graph__bar-group:hover .bar-graph__bar-version{
    color:black
}
.bar-graph__legend{
    font-size:0.8rem;
    padding-top:15px;
    display:flex;
    text-transform:uppercase;
    justify-content:center;
    color:#9aa1aa
}
@media screen and (max-width:48em){
    .bar-graph__legend{
        font-size:0.75rem
    }
}
@media screen and (max-width:40em){
    .bar-graph__legend{
        font-size:0.7rem
    }
}
.bar-graph__legend__colorbox{
    width:15px;
    height:15px;
    margin-right:10px
}
.bar-graph__legend__bar1,.bar-graph__legend__bar2{
    display:flex;
    align-items:center
}
.bar-graph__legend__bar1{
    margin-right:40px
}
@keyframes grow{
    from{
        transform:scaleY(0)
    }
    to{
        transform:scaleY(1)
    }
}
@keyframes fade-in{
    from{
        opacity:0
    }
    to{
        opacity:0.7
    }
}`;

interface Props {
    readings: PkgSize[];
    getHref: (r: PkgSize) => string;
}

export default class BarGraph extends React.PureComponent<Props, {}> {
    render() {
        const { readings, getHref } = this.props;

        const gzipValues = readings
            .filter(reading => !reading.disabled)
            .map(reading => reading.publishSize);

        const sizeValues = readings
            .filter(reading => !reading.disabled)
            .map(reading => reading.installSize);

        const maxValue = Math.max(...[...gzipValues, ...sizeValues]);
        const scale = 100 / maxValue;

        return (
            <div className="bar-graph-container">
                <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
                <figure className="bar-graph">
                    {readings.map((r, i) =>
                        r.disabled ? (
                            <a
                                key={i}
                                className="bar-graph__bar-group bar-graph__bar-group--disabled"
                                href={getHref(r)}
                            >
                                <div
                                    className="bar-graph__bar color1"
                                    style={{ height: '50%' }}
                                    title={getTooltipMessage(r)}
                                >
                                    <span className="bar-graph__bar-version">{r.version}</span>
                                    <span className="bar-graph__bar-version">{r.version}</span>
                                </div>
                            </a>
                        ) : (
                            <a key={i} className="bar-graph__bar-group" href={getHref(r)}>
                                <div
                                    className="bar-graph__bar color1"
                                    style={{ height: `${r.installSize * scale}%` }}
                                    title={getTooltipMessage(r)}
                                >
                                    <span className="bar-graph__bar-version">{r.version}</span>
                                </div>
                                <div
                                    className="bar-graph__bar2 color2"
                                    style={{ height: `${r.publishSize * scale}%` }}
                                />
                            </a>
                        ),
                    )}
                </figure>
                <div className="bar-graph__legend">
                    <div className="bar-graph__legend__bar1">
                        <div className="bar-graph__legend__colorbox color1" />
                        Install
                    </div>
                    <div className="bar-graph__legend__bar2">
                        <div className="bar-graph__legend__colorbox color2" />
                        Publish
                    </div>
                </div>
            </div>
        );
    }
}

const getTooltipMessage = (r: PkgSize) => {
    if (r.disabled) {
        return `${r.version} | Unknown size | Click to build and find out!`;
    }
    const install = getReadableFileSize(r.installSize).readable;
    const publish = getReadableFileSize(r.publishSize).readable;

    return `${r.version} | Publish Size: ${publish} | Install Size: ${install}`;
};
