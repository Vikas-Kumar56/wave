import React from "react";
import DropZone from "react-dropzone";
import axios from "axios";
import { withSnackbar } from "notistack";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

class FileUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
      uploading: false,
      removing: false,
      remove_id: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.reset) {
      return {
        uploadedFiles: [],
        uploading: false,
        removing: false,
        remove_id: ""
      };
    }

    return null;
  }

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data"
      }
    };

    formData.append("file", files[0]);
    axios.post("/api/users/uploadimage", formData, config).then(response => {
      this.props.enqueueSnackbar("Image uploaded Successfully", {
        variant: "success"
      });
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  showUploadedImages = () => {
    return this.state.uploadedFiles.map(item => {
      return (
        <div
          className="dropzone_box"
          key={item.public_id}
          onClick={() => this.onRemove(item.public_id)}
        >
          <Tooltip title="Click to remove image">
            <div
              className="wrap"
              style={{
                background: `url(${item.url}) no-repeat`
              }}
            />
          </Tooltip>
          {this.state.removing && this.state.remove_id === item.public_id ? (
            <div style={{ position: "relative", bottom: "85px", left: "65px" }}>
              <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
            </div>
          ) : null}
        </div>
      );
    });
  };

  onRemove = id => {
    this.setState({ removing: true, remove_id: id });
    axios
      .get(`/api/users/removeimage?public_id=${id}`)
      .then(response => {
        let images = this.state.uploadedFiles.filter(item => {
          return item.public_id !== id;
        });
        this.setState({
          uploadedFiles: images,
          removing: false,
          remove_id: ""
        });
        this.props.enqueueSnackbar("Image removed Successfully", {
          variant: "success"
        });
      })
      .catch(error => {
        this.setState({ removing: false, remove_id: "" });
        this.props.enqueueSnackbar("Image removed failed", {
          variant: "error"
        });
      });
  };
  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Tooltip title="Upload Images">
              <DropZone
                onDrop={event => this.onDrop(event)}
                multiple={false}
                className="dropzone_box"
              >
                <div className="wrap">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
              </DropZone>
            </Tooltip>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px"
                }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default withSnackbar(FileUpload);
