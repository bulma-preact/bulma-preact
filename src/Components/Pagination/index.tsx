import { h, Component } from "preact";
import { BasePropsType, getClasses } from '../../utils/Base'


export interface PaginationProps extends BasePropsType{
    page?: number
    pageSize?: number
    total?: number
    isShowTotal?: boolean
    previousText?: string 
    nextText?: string
    pageChange?: (page:number) => void  
}

export interface PaginationState {
    groupCount?: number,
    startPage?: number,
}

export class Pagination extends Component<PaginationProps, PaginationState> {
    defaultClass = 'pagination';
    previousText='上一页';
    nextText='下一页';
    totalPage: number = 0;
    startPage: number = 1;
    state:PaginationState = {
        groupCount: 5
    }
    constructor(props: PaginationProps) {
        super(props)
    }
    render() {
        const pageList = this.createPageList();
        const {page,pageSize,total,isShowTotal,previousText,nextText} = this.props;
        return this.totalPage>1 ? <nav className={getClasses(this.props, this.defaultClass)}  role="navigation" aria-label="pagination">
        <a class="pagination-previous" title="This is the first page" disabled={page===1} onClick={this.prePageHandeler}>{previousText ?previousText: this.previousText}</a>
        <a class="pagination-next" disabled={this.calculatePage(total,pageSize)===page} onClick={this.nextPageHandeler}>{nextText ?nextText: this.nextText}</a>
        <ul class="pagination-list">
          {pageList}
        </ul>
        {isShowTotal ? <span>共{this.props.total}条&nbsp;</span> : null}
      </nav>: null
    }

    createPageList =() => {
      const {total, pageSize, page} = this.props;
      const {groupCount} = this.state;
      this.calculateStartPage(page);
      const totalPage = this.calculatePage(total,pageSize);
      let startPage = this.startPage;
      this.totalPage = totalPage;
      let pages = [];
      if (totalPage <= 10) {
        /*总页码小于等于10时，全部显示出来*/
        for (let i = 1; i <= totalPage; i++) {
          pages.push(<li key={i} onClick={this.pageChange.bind(this,i)}>
          <a  className={page === i ? "pagination-link is-current" : "pagination-link"}>{i}</a>
          </li>)
        }
      } else {
        /*总页码大于10时，部分显示*/
        //第一页
        pages.push(<li onClick={this.pageChange.bind(this,1)}>
          <a  className={page === 1 ? "pagination-link is-current" : "pagination-link"}>1</a>
          </li>)

        let pageLength = 0;
        if (groupCount + startPage > totalPage) {
          pageLength = totalPage
        } else {
          pageLength = groupCount + startPage;
        }

      //前面省略号(当当前页码比分组的页码大时显示省略号)
      if (page >= groupCount) {
        pages.push(<li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>)
      }

      //非第一页和非最后一页显示
      for (let i:number = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(<li onClick={this.pageChange.bind(this,i)}>
            <a  className={page ===i ? "pagination-link is-current" : "pagination-link"}>{i}</a>
            </li>)
        }
      }

      //后面省略号
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(<li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>)
      }

      //最后一页
      pages.push(<li onClick={this.pageChange.bind(this,totalPage)}>
          <a  className={page === totalPage? "pagination-link is-current" : "pagination-link"}>{totalPage}</a>
          </li>)
      }
      return pages;
    }

    prePageHandeler = () => {
      let {page} = this.props;
      if (--page === 0) {
        return false
      }
      this.pageChange(page);
    }

    nextPageHandeler = () => {
      let {page, total, pageSize} = this.props;
      if (++page > this.totalPage) {
        return false
      }
      this.pageChange(page);
    }

    calculatePage= (total:number,pageSize: number) => {
      return Math.floor((total - 1) / pageSize) + 1;
    }

    calculateStartPage = (page: number)=> {
      const {groupCount} = this.state;
      let startPage: number;
      //当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
      if (page >= groupCount) {
        startPage = page-2;
      }

      if (page < groupCount) {
        startPage = 1;
      }

      //第一页时重新设置分组的起始页
      if (page === 1) {
        startPage = 1;
      }
      this.startPage = startPage;
    }

    pageChange(page:number) {
      this.calculateStartPage(page);
      this.props.pageChange(page);
    }
}
