import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './NewsDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown, faPrint, faMessage, faLink } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
// import AuthContext from '../../context/AuthContext';
import ParamContext from '../../context/ParamContext';
import { getPostsService } from '../../services/postService';
import convertTime from '../../utils/convertTime';
import { Helmet } from 'react-helmet-async';
import NotFound from '../../pages/NotFound/NotFound';
import Comment from '../Comment/Comment';
import CustomQuillStyles from '../../assets/CustomQuill.module.scss';
import 'react-quill/dist/quill.snow.css';

const cx = classNames.bind(styles);

function NewsDetail() {
    // const { user, showlogin, setShowlogin } = useContext(AuthContext);
    const { setParam } = useContext(ParamContext);
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [notFound, setNotFound] = useState(false);
    const [isUpSize, setIsUpSize] = useState(2);
    const [countComment, setCountComment] = useState(0);

    const fetchData = async () => {
        try {
            const response = await getPostsService(id);
            if (response.status === 200) {
                setData(response.data);
                setParam(response.data.category.main_category);
            } else {
                setNotFound(true);
                setData(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpSize = () => {
        if (isUpSize === 3) return;
        else setIsUpSize(isUpSize + 1);
    };

    const handleDownSize = () => {
        if (isUpSize === 1) return;
        else setIsUpSize(isUpSize - 1);
    };

    const handlePrint = () => {
        const printContent = document.getElementById('detail-main');
        const printTitle = document.getElementById('detail-title');
        const printSapo = document.getElementById('detail-sapo');

        // const windowUrl = 'about:blank';
        const uniqueName = new Date();
        const windowName = 'Print' + uniqueName.getTime();
        const printWindow = window.open('', windowName, 'left=50000,top=50000,width=0,height=0');
        printWindow.document.write('<html><head><title>Print it!</title>');
        printWindow.document.write(printTitle.innerHTML);
        printWindow.document.write(printSapo.innerHTML);
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const handleScrollToComment = () => {
        const comment = document.getElementById('detail-comments');
        comment.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCoppyLink = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return notFound ? (
        <NotFound />
    ) : (
        <div className={cx('wrapper')} id="detail-post">
            <Helmet>
                <title>{data ? data.title : 'Bài viết không tồn tại'} | Project3</title>
            </Helmet>
            <div className={cx('sticky')}>
                <button className={cx('btn-add-class')} onClick={handleUpSize} type="button">
                    <FontAwesomeIcon icon={faArrowCircleUp} />
                </button>
                <button className={cx('btn-add-class')} onClick={handleDownSize} type="button">
                    <FontAwesomeIcon icon={faArrowCircleDown} />
                </button>
                <button className={cx('btn-add-class')} onClick={handlePrint} type="button">
                    <FontAwesomeIcon icon={faPrint} />
                </button>
                <button className={cx('btn-add-class', 'btn-comment')} onClick={handleScrollToComment} type="button">
                    <FontAwesomeIcon icon={faMessage} />
                    <span className={cx('count-comment')}>{countComment}</span>
                </button>
                <button className={cx('btn-add-class')} onClick={handleCoppyLink} type="button">
                    <FontAwesomeIcon icon={faLink} />
                </button>
            </div>
            {data && (
                <div className={cx('container', 'size-' + isUpSize)}>
                    <div className={cx('detail-top')} id="detail-top">
                        <Link to={`/category/${data.category.main_category}`} className={cx('main-category')}>
                            {data.category.main_category}
                        </Link>
                        {data.category.sub_category && (
                            <Link to={`/category/${data.category.main_category}/${data.category.sub_category}`} className={cx('sub-category')}>
                                {data.category.sub_category}
                            </Link>
                        )}
                    </div>
                    <div className={cx('detail-title')} id="detail-title">
                        <h1>
                            <span>{data.title}</span>
                        </h1>
                    </div>
                    <div className={cx('detail-content')}>
                        <div className={cx('detail-content-main')}>
                            <div className={cx('detail-content-info')}>
                                <div className={cx('detail-author')}>
                                    <Link to={'/author/' + encodeURIComponent(data.author.id)} className={cx('detail-avatar')}>
                                        <img src={data.author.profile_pic} alt={data.author.last_name + ' ' + data.author.first_name} />
                                    </Link>
                                    <Link to={'/author/' + encodeURIComponent(data.author.id)} className={cx('detail-name')}>
                                        <span>{data.author.last_name + ' ' + data.author.first_name}</span>
                                    </Link>
                                    <span className={cx('detail-email')}>{data.author.email ? ` - ${data.author.email}` : ''}</span>
                                </div>
                                <div className={cx('detail-date')}>
                                    <div>{convertTime(data.created_at)}</div>
                                </div>
                            </div>
                            <h2 className={cx('detail-sapo')} id="detail-sapo">
                                {data.sapo}
                            </h2>
                            <div className={cx('detail-main')} id="detail-main">
                                <div className={cx('ql-snow')}>
                                    <div
                                        className={cx('bodyHTML_post', CustomQuillStyles['ql-editor'], 'ql-editor')}
                                        dangerouslySetInnerHTML={{ __html: data.body }}
                                    ></div>
                                </div>
                            </div>
                            <div className={cx('detail-tags')}>
                                {data.tags.map((item, index) => (
                                    <Link key={index} to={'/tags/' + item} className={cx('detail-tag')}>
                                        {item}
                                    </Link>
                                ))}
                            </div>
                            <div className={cx('detail-comments')} id="detail-comments">
                                <Comment setCountComment={setCountComment} />
                            </div>
                        </div>
                        <div className={cx('detail-sub')}></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewsDetail;
