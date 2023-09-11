import QuillComponent from '../QuillComponent/QuillComponent';
import 'react-quill/dist/quill.snow.css';  
import { createElement, useState } from 'react';
import styles from './CreateNewsComponent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { itemsNav } from '../../assets';
import PreView from '../PreView/PreView';
import { createPostService } from '../../services/authorService';
import Toast from '../Toast/Toast';

const cx = classNames.bind(styles);

function CreateNewsComponent() {
    const [title, setTitle] = useState('');
    const [sapo, setSapo] = useState('');
    const [tags, setTags] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [bodyHTML, setBodyHTML] = useState('');
    const [categoryMain, setCategoryMain] = useState('');
    const [categorySub, setCategorySub] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleMainCategoryChange = (event) => {
        setCategoryMain(event.target.value);
        setCategorySub('');
    };

    const handleSubCategoryChange = (event) => {
        setCategorySub(event.target.value);
    };

    const handleAddTag = () => {
        setTags([...tags, '']);
    };

    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleShowToast = (title, message, type) => {
        setShowToast({
            title: title,
            message: message,
            type: type,
        });
        setTimeout(() => {
            setShowToast(false);
        }, 2800);
    };

    const handlePost = async (e) => {
        e.preventDefault();
        if (!title || !sapo || !thumbnail || !bodyHTML) {
            handleShowToast('Thất bại', 'Vui lòng nhập đầy đủ thông tin', 'warning');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('sapo', sapo);
        formData.append('tags', JSON.stringify(tags));
        formData.append('thumbnail', thumbnail);
        formData.append('body', bodyHTML);
        formData.append('main_category', categoryMain);
        formData.append('sub_category', categorySub);

        try {
            const response = await createPostService(formData);
            if (response.status === 201) {
                handleShowToast('Thành công', 'Đăng bài viết thành công', 'success');
            } else {
                handleShowToast('Thất bại', 'Đăng bài viết thất bại!', 'error');
            }
        } catch (error) {
            handleShowToast('Thất bại', 'Đăng bài viết thất bại.', 'error');
        }
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            const img = document.getElementById('img-files');
            img.setAttribute('src', reader.result);
            setThumbnail(file);
        };
    };

    const handleAddFile = (e) => {
        const file = document.getElementById('post_img');
        file.click();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'create')}>
                <div className={cx('create-news')}>
                    <form encType="multipart/form-data" onSubmit={handlePost}>
                        <h1>Chọn chuyên mục</h1>
                        <div className={cx('category')}>
                            <label htmlFor="mainCategorySelect">Chọn một mục chính:</label>
                            <select id="mainCategorySelect" value={categoryMain} onChange={handleMainCategoryChange}>
                                <option value="">Chọn một mục chính</option>
                                {itemsNav.map((item, index) => (
                                    <option key={index} value={item.mainItem}>
                                        {item.mainItem}
                                    </option>
                                ))}
                            </select>

                            {categoryMain && (
                                <div>
                                    <label htmlFor="subCategorySelect">Chọn một mục phụ:</label>
                                    <select id="subCategorySelect" value={categorySub} onChange={handleSubCategoryChange}>
                                        <option value="">Chọn một mục phụ</option>
                                        {itemsNav
                                            .find((item) => item.mainItem === categoryMain)
                                            ?.items.map((subItem, subIndex) => (
                                                <option key={subIndex} value={subItem.nameItem}>
                                                    {subItem.nameItem}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        <h1>Tiêu đề</h1>
                        <input className={cx('title')} type="text" placeholder="Nhập tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="file" id="post_img" name="image" accept="image/*" multiple hidden onChange={handleChangeFile} />
                        <h1 className={cx('label-image')}>Chọn ảnh đại diện</h1>
                        <button type="button" onClick={handleAddFile} className={cx('add-img')}>
                            <FontAwesomeIcon icon={faFileArrowUp} className={cx('fa-solid', 'fa-plus')} />
                        </button>
                        <div className={cx('img-files')}>
                            <img src="" alt="" id="img-files" />
                        </div>
                        <h1>Tóm tắt</h1>
                        <textarea
                            type="text"
                            placeholder="Nhập tóm tắt"
                            className={cx('sapo')}
                            id="text-create-post"
                            name="caption"
                            autoComplete="off"
                            value={sapo}
                            onChange={(e) => setSapo(e.target.value)}
                        />
                        <h1 className={cx('label-content')}>Nội dung</h1>
                        <QuillComponent contentHTML={bodyHTML} onChangeQuill={setBodyHTML} className={cx('content')} />
                        <div className={cx('tags')}>
                            <h1 className={cx('label-tags')}>Tags</h1>
                            <button onClick={handleAddTag} type="button" className={cx('add-tag')}>
                                Thêm tag <FontAwesomeIcon icon={faCirclePlus} className={cx('fa-plus')} />
                            </button>
                            {tags.map((tag, index) => (
                                <span className={cx('tag-wrapper')} key={index}>
                                    <input
                                        className={cx('tag')}
                                        key={index}
                                        type="text"
                                        placeholder="Nhập tag"
                                        value={tag}
                                        onChange={(e) => handleTagChange(index, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={cx('remove-tag')}
                                        onClick={() => {
                                            const newTags = [...tags];
                                            newTags.splice(index, 1);
                                            setTags(newTags);
                                        }}
                                    >
                                        X
                                    </button>
                                </span>
                            ))}
                        </div>
                        <button type="submit" className={cx('post')}>
                            <div className={cx('post-text')}>ĐĂNG BÀI</div>
                        </button>
                    </form>
                </div>
            </div>

            <div className={cx('middle')}>Xem trước</div>
            <div className={cx('container', 'preview')}>
                <PreView categoryMain={categoryMain} categorySub={categorySub} content={title} sapo={sapo} tags={tags} bodyHTML={bodyHTML} />
            </div>
            <div className={cx('toast')}>{showToast && <Toast title={showToast.title} message={showToast.message} type={showToast.type} />}</div>
        </div>
    );
}

export default CreateNewsComponent;
