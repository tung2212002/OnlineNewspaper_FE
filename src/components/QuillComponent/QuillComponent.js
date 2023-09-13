import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import styles from './QuillComponent.module.scss';
import classNames from 'classnames/bind';
import ImageResize from 'quill-image-resize-module-react';
import { useRef } from 'react';
ReactQuill.Quill.register('modules/imageResize', ImageResize);

const cx = classNames.bind(styles);

const VideoModule = ReactQuill.Quill.import("formats/video");

class CustomVideo extends VideoModule {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("width", "100%"); // Thay đổi kích thước chiều rộng của video
    node.setAttribute("height", "385px"); // Thay đổi kích thước chiều cao của video
    return node;
  }
}

ReactQuill.Quill.register(CustomVideo, true);


function QuillComponent({ contentHTML, onChangeQuill }) {

  const quillRef = useRef(null);

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header formatting options
            ['bold', 'italic', 'underline', 'strike'], // Font formatting options
            [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and Unordered lists
            ['link', 'image', 'video'], // Inserting links, images, and videos
            [{ align: [] }], // Text alignment options
            ['blockquote', 'code-block'],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ['clean'], // Remove formatting option
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values

        ],
        imageResize: {
            modules: ['Resize', 'DisplaySize'],
        },
        clipboard: {
            matchVisual: false,
        },
    };
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'align',
        'code-block',
        'color',
        'background',
        'font',
        'clean',
        'size',
        'direction',
        'script',
    ];

    return (
        <div className={cx('wrapper', 'ql-snow')}>
            <div className={cx('container', 'ql-editor')}>
                <ReactQuill theme="snow" modules={modules} formats={formats} value={contentHTML} onChange={onChangeQuill} className="ql-editor" ref={quillRef} />
            </div>
        </div>
    );
}

export default QuillComponent;
