class ImagePreview extends React.Component {
  render() {
    return (
      <li className='image-input-preview-image'>
        <img src={this.props.url} alt='Preview' />
        <button onClick={this.props.onDelete} dangerouslySetInnerHTML={{__html:'&times;'}} />
      </li>
    );
  }
}

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
  }

  /**
   * Converts a file to a displayable URL.
   *
   * @param {Blob} file File content
   * @param {Function} callback will be executed when the file has loaded
   */
  fileToURL(file, callback) {
    let reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  /**
   * Handler for the change event of the file input. When files are selected
   * they will be read as URL and their previews will be added.
   * It will also execute the passed callback onUpload.
   */
  onChange() {
    let input = this.refs.file.getDOMNode();

    if (input.files.length > 0) {
      [].forEach.call(input.files, function (file, i) {
        this.fileToURL(file, function (url) {
          this.setState({
            images: this.state.images.concat([url])
          });
        }.bind(this));
      }.bind(this));

      this.props.onUpload(input.files);
    }
  }

  onClick() {
    this.refs.file.getDOMNode().click();
  }

  /**
   * Returns a function that will delete the image at the given index
   *
   * @param {Number} i Index of the image
   * @return {Function}
   */
  onDelete(i) {
    return function () {
      this.setState(this.state.images.splice(i, 1));
    }.bind(this);
  }

  render() {
    let previews = this.state.images
      .map((url, i) => <ImagePreview url={url} key={i} onDelete={this.onDelete(i).bind(this)} />);

    return (
      <div className='image-input'>
        <div className='image-input-previews'>
          {previews}
        </div>

        <div style={{display: 'none'}} className='image-input-hidden'>
          <input type='file' multiple={this.props.multiple}
            name={this.props.name} id={this.props.id} ref='file'
            onChange={this.onChange.bind(this)} required={this.props.required}
            accept={this.props.accept} />
        </div>

        <div className='image-input-btn'>
          <button onClick={this.onClick.bind(this)}>{this.props.buttonText}</button>
        </div>
      </div>
    );
  }
}

ImageInput.defaultProps = {
  buttonText: 'Select',
  onUpload: () => undefined,
  multiple: false,
  required: false,
  accept: 'image/*'
};

ImageInput.propTypes = {
  buttonText: React.PropTypes.string,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  onUpload: React.PropTypes.func,
  multiple: React.PropTypes.bool,
  required: React.PropTypes.bool,
  accept: React.PropTypes.string
};

export default ImageInput;
