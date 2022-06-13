import React from 'react';

/**
 *
 */
class DeveloperData extends React.Component {
  /**
   *
   * @return {null}
   */
  render() {
    const packageName = process.env.REACT_APP_NAME;
    const versionNumber = process.env.REACT_APP_VERSION;
    const executionMode = process.env.NODE_ENV;
    const nodeVersion = process.env.REACT_APP_NODE;

    return (
      <div className="container">
        <div className="row mb-3">
          <div className="col d-flex justify-content-center">
            <img src={require('../../assets/logo-text.png')} alt="Amphere"
              width="192" height="56"/>
          </div>
        </div>

        <div className="my-5 text-center">
          <img className="img-fluid rounded"
            src={require('../../assets/logo-graphics-256.png')} alt="Amphere"
            width="256" height="256"/>
        </div>

        <div className="container-narrow mx-auto my-5">
          <table className="table mw-100 text-light text-break">
            <tbody>
              <tr>
                <th scope="row">Amphere Web App</th>
                <td></td>
              </tr>
              <tr>
                <th scope="row">Package</th>
                <td className="font-monospace">{packageName}</td>
              </tr>
              <tr>
                <th scope="row">Version</th>
                <td className="font-monospace">{versionNumber}</td>
              </tr>
              <tr>
                <th scope="row">Environment</th>
                <td className="font-monospace">{executionMode}</td>
              </tr>
              <tr>
                <th scope="row">Platform</th>
                <td className="font-monospace">Node.js {nodeVersion}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row my-5">
          <p className="text-center font-weight-light text-muted">
            Amphere Web App.<br/>
            Copyright &copy; 2022 Amphere Ltd. All rights reserved.
          </p>
        </div>
      </div>
    );
  }
}

export default DeveloperData;
