import 'vant/lib/index.css'

import Vue from 'vue'
import { Tabbar, TabbarItem } from 'vant';
import { Icon } from 'vant';
import { NavBar } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { List } from 'vant';
import { Cell } from 'vant';
import { Divider } from 'vant';
import { Card } from 'vant';
import { Tag } from 'vant';
import { Notify } from 'vant';
import { Search } from 'vant';
import { Col, Row } from 'vant';
import { Popup } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(List);
Vue.use(Cell);
Vue.use(Divider);
Vue.use(Card);
Vue.use(Tag);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Popup);


Vue.prototype.$message = Notify