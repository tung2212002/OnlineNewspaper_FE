import styles from './Author.module.scss';
import classNames from 'classnames/bind';
import {  useContext, useEffect, useState } from 'react';
import BoxNews from '../../components/BoxNews/BoxNews';
import NotFound from '../NotFound/NotFound';
import convertTime from '../../utils/convertTime';
import { Helmet } from 'react-helmet-async';
import {  useParams } from 'react-router-dom';
import { getListsPostByAuthorService } from '../../services/postService';
import ParamContext from '../../context/ParamContext';

const cx = classNames.bind(styles);

function Author() {
    const { author_id } = useParams();

    const MAX_CONTENT_LENGTH = 100;

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [numberPage, setNumberPage] = useState(1);
    const [numberPost, setNumberPost] = useState(0);

    const { param, setParam } = useContext(ParamContext);

    const fetchDataStart = async (param) => {
        const paramsGet = {
            index: (param - 1) * 12,
            count: 12,
        };

        try {
            const response = await getListsPostByAuthorService(author_id, paramsGet);
            if (response.status === 200) {
                setData(response.data);
                setNumberPage(Math.ceil(response.data.number_of_posts / 12));
                setNumberPost(response.data.number_of_posts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickPage = (e) => {
        if (e.target.innerText == page) {
            return;
        }
        setPage(parseInt(e.target.innerText));
        fetchDataStart(e.target.innerText);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        fetchDataStart(page);
        setParam(null);
    }, []);

    return data ? (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>{data.author.first_name + ' ' + data.author.last_name + ' | Project3'}</title>
            </Helmet>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1> Tác giả : {data.author.first_name + ' ' + data.author.last_name}</h1>
                    <h2> Số bài viết : {numberPost} bài viết</h2>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-left', 'content-left-author')}>
                        <BoxNews
                            image={data.author.profile_pic}
                            title={data.author.first_name + ' ' + data.author.last_name}
                            sapo={data.author.email}
                            typeLayout="col"
                            height={300}
                            maxContentLength={MAX_CONTENT_LENGTH}
                            link={`/author/${data.author.id}`}
                        />
                    </div>
                    <div className={cx('content-right')}>
                        {data &&
                            data.posts.slice(0, 2).map((item, index) => {
                                return (
                                    <div className={cx('box-news')} key={index}>
                                        <BoxNews
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            width={350}
                                            link={`/${item.id}`}
                                            sapo={convertTime(item.created_at)}
                                            height={200}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('content-left')}>
                        {data &&
                            data.posts.slice(2, 12).map((item, index) => {
                                return (
                                    <div className={cx('box-news')} key={index}>
                                        <BoxNews
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            height={205}
                                            width={310}
                                            sapo={convertTime(item.created_at)}
                                            tag={item.tags}
                                            link={`/${item.id}`}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('button-more')}>
                        {[...Array(numberPage)].map((_, index) => (
                            <button key={index} onClick={handleClickPage} className={cx('btn', { 'btn-active': index + 1 == page })}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <NotFound />
        </div>
    );
}

export default Author;
