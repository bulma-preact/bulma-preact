## Pagination
create Pagination handle pagechange

### Props
``` ts
export interface PaginationProps extends BasePropsType {
    page?: number
    pageSize?: number
    total?: number
    isShowTotal?: boolean
    previousText?: string
    nextText?: string
    pageChange?: Function
}
```

### Demo
``` tsx
import { Pagination } from 'bulma-preact'
import { render, h, Component } from 'preact'

class DemoPagination extends Component {
    constructor (props) {
        super(props)
        this.state = { 
            page: 1,
            pageSize:20,
            total: 500
        }
    }

    pageChange = (page:number) => {
        this.setState({
            page: page
        })
    }

    render() {
        const {page,pageSize,total} = this.state;
        return <div>
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange} previousText="Previous" nextText="Next page" />
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange}/>
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange} isFloat="centered"/>
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange} isFloat="right"/>
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange} isSize="small" isShowTotal/>
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange} isRounded isSize="medium" isShowTotal/>
            <Pagination page={page} pageSize={pageSize} total={total} pageChange={this.pageChange} isSize="large" isShowTotal/>
        </div>
    }
}
render(<DemoPagination />, container)
```

