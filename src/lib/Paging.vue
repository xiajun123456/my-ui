<template>
  <div class="pager-container clear">
    <ul class="pager-list clear pull-left">
      <li class="pull-left">
        <a class="page-icon first-page"
           @click="goFirst"
           :class="{'page-disabled':comCurrentPage==1}">首页</a>
      </li>
      <li class="pull-left">
        <a class="page-icon"
           @click="last"
           :class="{'page-disabled':comCurrentPage==1}">
          <span class="go-before"></span>
        </a>
      </li>
      <li class="pull-left"
          v-if="nowItemsPerPage!=1">
        <a class="page-icon"
           @click="lastItemPage">...</a>
      </li>
      <li class="pull-left"
          v-for="n in totalCount/pageSize"
          v-if="n<(nowItemsPerPage*itemsPerPage+1) && n>((nowItemsPerPage-1)*itemsPerPage)"
          :key="n">
        <a class="page-icon"
           @click="jumpPage(n)"
           :class="{'active-page':comCurrentPage===n}">{{n}}</a>
      </li>
      <li class="pull-left"
          v-if="nowItemsPerPage < total/(pageSize*itemsPerPage) && total/(pageSize*itemsPerPage) > 1">
        <a class="page-icon"
           @click="nextItemPage">...</a>
      </li>
      <li class="pull-left">
        <a class="page-icon"
           @click="next"
           :class="{'page-disabled':comCurrentPage==totalCount/pageSize}">
          >
        </a>
      </li>
      <li class="pull-left">
        <a class="page-icon last-page"
           @click="goLast"
           :class="{'page-disabled':comCurrentPage==totalCount/pageSize}">
          末页
        </a>
      </li>
    </ul>
    <p class="pull-left total-count">
      共 <span class="total-count-text">{{totalCount/pageSize}}</span> 页
    </p>
    <p class="pull-left">
      到 <input v-model.number="checkPage"
               @blur='inputBlur'
               class="el-input__inner pager-input"> 页
    </p>
    <p class="pull-left">
      <button class="btn sure-check-page"
              @click="checkedPage">确定
      </button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'paging',
    data () {
      return {
        pageNumber: 1,
        checkPage: 1,
        pageSize: 10,
        itemsPerPage: 5,
        nowItemsPerPage: 1,
        comCurrentPage: 1
      }
    },
    props: {
      currentPage: {
        default: 1,
        type: Number
      },
      total: Number
    },
    watch: {
      currentPage (newVal) {
        if (this.comCurrentPage === newVal) {
          return
        }
        this.nowItemsPerPage = Math.ceil(newVal / 5)
        this.comCurrentPage = newVal
      }
    },
    methods: {
      checkedPage () {
        if (this.checkPage === this.comCurrentPage || !this.checkPage) {
          return
        }
        if (this.checkPage > this.totalCount / this.pageSize) {
          this.checkPage = this.totalCount / this.pageSize
        }
        this.comCurrentPage = this.checkPage
        this.$emit('page-change', this.comCurrentPage)
      },
      inputBlur () {
        this.checkPage = Number.parseInt(this.checkPage) || 1
        if (this.checkPage < 1) {
          this.checkPage = 1
        }
      },
      goFirst () {
        if (this.comCurrentPage === 1) {
          return
        }
        this.nowItemsPerPage = 1
        this.comCurrentPage = this.checkPage = 1
        this.$emit('page-change', this.comCurrentPage)
      },
      goLast () {
        if (this.comCurrentPage === this.totalCount / this.pageSize) {
          return
        }
        this.nowItemsPerPage = Math.ceil(this.totalCount / (this.pageSize * this.itemsPerPage))
        this.comCurrentPage = this.checkPage = this.totalCount / this.pageSize
        this.$emit('page-change', this.comCurrentPage)
      },
      jumpPage (n) {
        if (this.comCurrentPage === n) {
          return
        }
        this.comCurrentPage = this.checkPage = n
        this.$emit('page-change', n)
      },
      nextItemPage () {
        if (this.itemsPerPage === 1) {
          return
        }
        this.comCurrentPage = this.checkPage = this.nowItemsPerPage * this.itemsPerPage + 1
        ++this.nowItemsPerPage
        this.$emit('page-change', this.comCurrentPage)
      },
      lastItemPage () {
        if (this.itemsPerPage === 1) {
          return
        }
        --this.nowItemsPerPage
        this.comCurrentPage = this.checkPage = this.nowItemsPerPage * this.itemsPerPage
        this.$emit('page-change', this.comCurrentPage)
      },
      next () {
        if (this.comCurrentPage === this.totalCount / this.pageSize) {
          return
        }
        if (this.comCurrentPage % 5 === 0) {
          ++this.nowItemsPerPage
        }
        ++this.comCurrentPage
        this.checkPage = this.comCurrentPage
        this.$emit('page-change', this.comCurrentPage)
      },
      last () {
        if (this.comCurrentPage === 1) {
          return
        }
        if ((this.comCurrentPage - 1) % 5 === 0) {
          --this.nowItemsPerPage
        }
        --this.comCurrentPage
        this.checkPage = this.comCurrentPage
        this.$emit('page-change', this.comCurrentPage)
      }
    },
    created () {
      this.checkPage = this.comCurrentPage = this.currentPage > Math.ceil(this.total / this.pageSize) ? 1 : this.currentPage
      this.nowItemsPerPage = Math.ceil(this.comCurrentPage / (this.pageSize * this.itemsPerPage))
    },
    computed: {
      totalCount () {
        return Math.ceil(this.total / this.pageSize) * this.pageSize
      }
    }
  }
</script>

<style lang="scss" type="text/scss" >
  .pager-container {
    .first-page {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .last-page {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    .page-icon {
      cursor: pointer;
      padding: 7px 12px;
      line-height: 1.42857;
      text-decoration: none;
      color: #337ab7;
      background-color: #fff;
      border: 1px solid #ddd;
      margin-left: -1px;
      .go-before:after {
        content: '<';
      }
      &:hover {
        z-index: 2;
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
      }
    }
    .active-page {
      background-color: #7487a0;
      border-color: #7487a0;
      color: #fff;
      &:hover {
        background-color: #7487a0;
        border-color: #7487a0;
        color: #fff;
      }
    }
    p {
      line-height: 30px;
      margin-left: 10px;
    }
    .total-count {
      padding: 0 9px;
      border: 1px solid #ddd;
      border-radius: 4px;
      .total-count-text {
        color: #2793E7;
      }
    }
    .pager-list {
      margin-top: 5px;
    }
    .pager-input {
      width: 55px;
      height: 32px;
      text-align: center;
    }
    .sure-check-page {
      color: #fff;
      width: 50px;
      height: 30px;
      border-radius: 4px;
      background: #2793E7;
      margin-top: -1px;
      &:hover {
        background: #2793E7*0.9;
      }
    }
    .page-disabled {
      color: #777;
      background-color: #fff;
      border-color: #ddd;
      cursor: not-allowed;
      &:hover {
        background: #fff;
        color: #777;
      }
    }
  }
</style>
