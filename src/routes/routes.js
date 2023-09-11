import HomePages from "../pages/Homepage/Homepage";
import SubPage from "../pages/SubPage/Subpage";
import ReadNews from "../pages/ReadNews/ReadNews";
import CreateNews from "../pages/CreateNews/CreateNews";
import FindTags from "../pages/FindTags/FindTags";
import FindCategory from "../pages/FindCategory/FindCategory";
import NotFound from "../pages/NotFound/NotFound";
import ManageNews from "../pages/ManageNews/ManageNews";
import EditNews from "../pages/EditNews/EditNews";
import Search from "../pages/Search/Search";
import Author from "../pages/Author/Author";
export const routes = {
    home : '/',
    sub : '/sub',
    read : '/:id',
    create : '/posts/create',
    manageNews : '/posts/manage',
    editNews : '/posts/edit/:id',
    tags : '/tags/:tag_name',
    category : '/category/:main_category/:sub_category?',
    search : '/search/',
    author : '/author/:author_id',
    notfound : '*',
};

export const publicRoutes = [
    { path: routes.home, component: HomePages},
    { path: routes.sub, component: SubPage},
    { path: routes.read, component: ReadNews},
    { path: routes.create, component: CreateNews},
    { path: routes.manageNews, component: ManageNews},
    { path: routes.tags, component: FindTags},
    { path: routes.category, component: FindCategory},
    { path: routes.notfound, component: NotFound},
    { path: routes.editNews, component: EditNews},
    { path: routes.search, component: Search},
    { path: routes.author, component: Author},
];
