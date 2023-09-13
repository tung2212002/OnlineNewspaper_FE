import styles from './Find.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListsPostByCategoryService, getListsPostByTagService } from '../../services/postService';
import BoxNews from '../BoxNews/BoxNews';
import NotFound from '../../pages/NotFound/NotFound';
import ParamContext from '../../context/ParamContext';

const cx = classNames.bind(styles);

function Find({ type = '', params = {} }) {
    const { setParam } = useContext(ParamContext);

    const MAX_CONTENT_LENGTH = 100;
    const MAX_SAPO_LENGTH = 200;

    const [buttonMore, setButtonMore] = useState(false);
    const [data, setData] = useState(null);
    const [addData, setAddData] = useState(null);
    const [index, setIndex] = useState(0);
    const [notFound, setNotFound] = useState(false);

    const fetchDataStart = async () => {
        if (type === 'category') {
            const paramsGet = {
                main_category: params.main_category,
                sub_category: params.sub_category,
                count: 15,
            };

            try {
                const response = await getListsPostByCategoryService(paramsGet);
                if (response.status === 200) {
                    if (response.data.length === 0) {
                        setNotFound(true);
                        return;
                    }
                    setData(response.data);
                    setAddData(null);
                    setIndex(0);
                    setNotFound(false);
                    if (response.data.length >= 15) {
                        setIndex((index) => index + response.data.length);
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else if (type === 'tag') {
            const paramsGet = {
                tag_name: params.tag_name,
                count: 15,
            };

            try {
                const response = await getListsPostByTagService(paramsGet);
                if (response.status === 200) {
                    if (response.data.length === 0) {
                        setNotFound(true);
                    }
                    setData(response.data);
                    setAddData(null);
                    setIndex(0);
                    setNotFound(false);
                    if (response.data.length >= 15) {
                        setIndex((index) => index + response.data.length);
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const fetchDataMore = async () => {
        if (type === 'category') {
            const paramsGet = {
                main_category: params.main_category,
                sub_category: params.sub_category,
                count: 10,
                index: index,
            };

            try {
                const response = await getListsPostByCategoryService(paramsGet);
                if (response.status === 200) {
                    if (addData === null) {
                        setAddData(response.data);
                    } else {
                        setAddData([...addData, ...response.data]);
                    }
                    if (response.data.length < 10) {
                        setButtonMore(false);
                    } else {
                        setIndex((index) => index + response.data.length);
                        setButtonMore(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else if (type === 'tag') {
            const paramsGet = {
                tag_name: params.tag_name,
                count: 10,
                index: index,
            };

            try {
                const response = await getListsPostByTagService(paramsGet);
                if (response.status === 200) {
                    if (addData === null) {
                        setAddData(response.data);
                    } else {
                        setAddData([...addData, ...response.data]);
                    }
                    if (response.data.length < 10) {
                        setButtonMore(false);
                    } else {
                        setIndex((index) => index + response.data.length);
                        setButtonMore(true);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        fetchDataStart();
        setParam(null);
    }, [params]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>{type === 'category' ? (params.sub_category ? params.sub_category : params.main_category) : params.tag_name}</h1>
                </div>
            </div>
            {notFound ? (
                <NotFound />
            ) : (
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <div className={cx('content-left')}>
                            {data &&
                                data.slice(0, 1).map((item, index) => {
                                    return (
                                        <BoxNews
                                            key={index}
                                            image={item.thumbnail}
                                            title={item.title}
                                            sapo={item.sapo}
                                            typeLayout="col"
                                            height={465}
                                            maxContentLength={MAX_CONTENT_LENGTH}
                                            maxSapoLength={MAX_SAPO_LENGTH}
                                            link={`/${item.id}`}
                                        />
                                    );
                                })}
                        </div>
                        <div className={cx('content-right')}>
                            {data &&
                                data.slice(1, 3).map((item, index) => {
                                    return <BoxNews key={index} image={item.thumbnail} title={item.title} typeLayout="col" height={220} link={`/${item.id}`} />;
                                })}
                        </div>
                    </div>
                    <div className={cx('container')}>
                        <div className={cx('content-bottom')}>
                            {data &&
                                data.slice(3, 7).map((item, index) => {
                                    return <BoxNews key={index} image={item.thumbnail} title={item.title} typeLayout="col" height={160} link={`/${item.id}`} />;
                                })}
                        </div>
                    </div>

                    <div className={cx('container')}>
                        <div className={cx('content-left')}>
                            {data &&
                                data.slice(7, 15).map((item, index) => {
                                    return (
                                        <BoxNews
                                            key={index}
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            height={205}
                                            width={310}
                                            sapo={item.sapo}
                                            tag={item.tags}
                                            maxSapoLength={MAX_SAPO_LENGTH}
                                            link={`/${item.id}`}
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    <div className={cx('container')}>
                        <div className={cx('content-left')}>
                            {addData &&
                                addData.map((item, index) => {
                                    return (
                                        <BoxNews
                                            key={index}
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            height={205}
                                            width={310}
                                            sapo={item.sapo}
                                            tag={item.tags}
                                            maxSapoLength={MAX_SAPO_LENGTH}
                                            link={`/${item.id}`}
                                        />
                                    );
                                })}
                        </div>
                    </div>

                    <div className={cx('container')}>
                        {buttonMore && (
                            <div className={cx('button-more')} onClick={fetchDataMore}>
                                <button>
                                    <span>Xem thêm</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Find;
