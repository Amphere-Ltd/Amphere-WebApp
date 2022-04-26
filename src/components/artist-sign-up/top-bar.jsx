class TopBar extends React.Component {
  render() {
    return (
        <div className="row mb-3">
          <div className="col mw-45 d-flex justify-content-start">
            <img src="../../assets/logo-text.png" alt="Amphere"
                 width="192" height="56"/>
          </div>
          <div className="col {{ " d-none" if prog == 0 else " mw-45 ps-0 pe-4
               py-2" }}">
            <!-- Hide the artist's name and progress bar if we are on the root page. -->
            <div className="d-flex justify-content-end align-items center">
              <div className="text-end">{{
                display_name
                if display_name
                else "Unknown Artist"
              }}</div>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <div className="progress" style="width: 175px; height: 5px">
                <div className="progress-bar bg-amphere-red w-{{ prog }}"
                     role="progressbar" aria-valuenow="{{ prog }}"
                     aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default TopBar;
