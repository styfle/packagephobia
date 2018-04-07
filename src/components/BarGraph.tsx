import * as React from 'react';
import { getReadableFileSize } from '../parse-utils';
const stylesheet = `.bar-graph-container{display:-webkit-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;width:100%;height:48vh}.bar-graph{height:45vh;padding-bottom:10vh;display:-webkit-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:baseline;-ms-flex-align:baseline;-webkit-align-items:baseline;-webkit-box-align:baseline;-ms-flex-align:baseline;align-items:baseline;margin:0;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center}.bar-graph__bar-group{height:100%;position:relative;width:1.6vw;min-width:15px;margin:0 5px}.bar-graph__bar,.bar-graph__bar2{width:100%;position:absolute;left:0;bottom:0;-webkit-transition:background 0.2s;-webkit-transition:background 0.2s;transition:background 0.2s;-webkit-animation:grow 0.4s cubic-bezier(0.305,0.42,0.205,1.2);-webkit-animation:grow 0.4s cubic-bezier(0.305,0.42,0.205,1.2);animation:grow 0.4s cubic-bezier(0.305,0.42,0.205,1.2);-webkit-transform-origin:100% 100%;-webkit-transform-origin:100% 100%;-ms-transform-origin:100% 100%;transform-origin:100% 100%;cursor:pointer}.bar-graph__bar{background:#65C3F8}.bar-graph__bar-group:not(.bar-graph__bar-group--disabled):hover .bar-graph__bar{background:#4db9f7}.bar-graph__bar-group--disabled .bar-graph__bar{background:#dfe1e4}.bar-graph__bar-group--disabled .bar-graph__bar:hover{background:#c4c8cd}.bar-graph__bar2{background:#65A1F8;z-index:1;pointer-events:none}.bar-graph__bar-group:hover .bar-graph__bar2{background:#4d92f7}.bar-graph__bar-version{font-size:0.8rem;position:absolute;bottom:-50px;font-weight:400;display:block;-webkit-transform:rotate(-90deg);-webkit-transform:rotate(-90deg);-ms-transform:rotate(-90deg);transform:rotate(-90deg);-webkit-transform-origin:50% 50%;-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%;width:100%;text-align:right;font-variant-numeric:tabular-nums;color:#666E78;-webkit-transition:opacity 0.2s,color 0.2s;-webkit-transition:opacity 0.2s,color 0.2s;transition:opacity 0.2s,color 0.2s;-webkit-animation:fade-in 0.5s 0.1s forwards cubic-bezier(0.305,0.42,0.205,1.2);-webkit-animation:fade-in 0.5s 0.1s forwards cubic-bezier(0.305,0.42,0.205,1.2);animation:fade-in 0.5s 0.1s forwards cubic-bezier(0.305,0.42,0.205,1.2);font-family:"Source Code Pro","SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;-webkit-letter-spacing:-1px;-moz-letter-spacing:-1px;-ms-letter-spacing:-1px;letter-spacing:-1px}@media screen and (max-width:48em){.bar-graph__bar-version{font-size:0.75rem}}@media screen and (max-width:40em){.bar-graph__bar-version{font-size:0.7rem}}.bar-graph-container:hover .bar-graph__bar-version{opacity:1;color:black}.bar-graph__bar-group:hover .bar-graph__bar-version{color:black}.bar-graph__legend{font-size:0.8rem;padding-top:15px;display:-webkit-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;text-transform:uppercase;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#9aa1aa}@media screen and (max-width:48em){.bar-graph__legend{font-size:0.75rem}}@media screen and (max-width:40em){.bar-graph__legend{font-size:0.7rem}}.bar-graph__legend__colorbox{width:15px;height:15px;margin-right:10px}.bar-graph__legend__bar1 .bar-graph__legend__colorbox{background:#65C3F8}.bar-graph__legend__bar2 .bar-graph__legend__colorbox{background:#65A1F8}.bar-graph__legend__bar1,.bar-graph__legend__bar2{display:-webkit-box;display:-ms-flexbox;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.bar-graph__legend__bar1{margin-right:40px}@-webkit-keyframes growfrom{-webkit-transform:scaleY(0);-webkit-transform:scaleY(0);-ms-transform:scaleY(0);transform:scaleY(0)}to{-webkit-transform:scaleY(1);-webkit-transform:scaleY(1);-ms-transform:scaleY(1);transform:scaleY(1)}@-webkit-keyframes grow{from{-webkit-transform:scaleY(0);-webkit-transform:scaleY(0);-ms-transform:scaleY(0);transform:scaleY(0)}to{-webkit-transform:scaleY(1);-webkit-transform:scaleY(1);-ms-transform:scaleY(1);transform:scaleY(1)}}@keyframes grow{from{-webkit-transform:scaleY(0);-webkit-transform:scaleY(0);-ms-transform:scaleY(0);transform:scaleY(0)}to{-webkit-transform:scaleY(1);-webkit-transform:scaleY(1);-ms-transform:scaleY(1);transform:scaleY(1)}}@-webkit-keyframes fade-infrom{opacity:0}to{opacity:0.7}@-webkit-keyframes fade-in{from{opacity:0}to{opacity:0.7}}@keyframes fade-in{from{opacity:0}to{opacity:0.7}}`;

interface Props {
    readings: PkgSize[];
    getHref: (r: PkgSize) => string;
}

export default class BarGraph extends React.PureComponent<Props, {}> {
  render() {
    const { readings, getHref } = this.props

    const gzipValues = readings
      .filter(reading => !reading.disabled)
      .map(reading => reading.publishSize)

    const sizeValues = readings
      .filter(reading => !reading.disabled)
      .map(reading => reading.installSize)

    const maxValue = Math.max(...[...gzipValues, ...sizeValues])
    const scale = 100 / maxValue

    const getTooltipMessage = (r: PkgSize) => {
      return `Publish Size: ${getReadableFileSize(r.installSize).readable}`
        + `| Install Size: ${getReadableFileSize(r.publishSize).readable}`;
    }

    return (
      <div className="bar-graph-container">
        <style dangerouslySetInnerHTML={ { __html: stylesheet } } />
        <figure className="bar-graph">
          {
            readings.map((r, i) => (
              r.disabled ? (
                <a
                  key={i}
                  className="bar-graph__bar-group bar-graph__bar-group--disabled"
                  href={getHref(r)}
                  title={`Click to view version ${r.version}`}
                >
                  <div
                    className="bar-graph__bar"
                    style={{ height: '50%' }}
                    title="Unknown | Click to build"
                  >
                    <span className="bar-graph__bar-version">{ r.version }</span>
                    <span className="bar-graph__bar-version">{ r.version }</span>
                  </div>
                </a>
              ) : (
                <a
                  key={i}
                  className="bar-graph__bar-group"
                  href={getHref(r)}
                  title={`Click to view version ${r.version}`}
                >
                  <div
                    className="bar-graph__bar"
                    style={{ height: `${r.installSize * scale}%` }}
                    title={getTooltipMessage(r) }
                  >
                      <span className="bar-graph__bar-version">{r.version}</span>
                  </div>
                  <div
                    className="bar-graph__bar2"
                    style={{ height: `${r.publishSize * scale}%` }}
                  />
                </a>
              )
            ))
          }
        </figure>
        <div className="bar-graph__legend">
          <div className="bar-graph__legend__bar1">
            <div className="bar-graph__legend__colorbox"/>
            Install
          </div>
          <div className="bar-graph__legend__bar2">
            <div className="bar-graph__legend__colorbox"/>
            Publish
          </div>
        </div>
      </div>
    )
  }
}
