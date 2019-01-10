 <template>
  <div>
    <div class="table-container">
      <div class="table-content">
        <table v-if="tableData.length && loaded">
          <thead>
          <tr>
            <th class="table-header-td table-td" v-if="checked">
              <el-checkbox @change="selectAll"
                           v-model="checkedAll">
              </el-checkbox>
            </th>
            <th v-for="(val,key) in Object.keys(tableKeys)"
                class="table-header-td table-td"
                :key="key">
              {{val}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(scoped,key) in tableData"
              :key="key">
            <td class="table-body-td table-td" v-if="checked">
              <el-checkbox :key="key"
                           @change="handleCheckedCitiesChange"
                           v-model="checkedItem[key]"></el-checkbox>
            </td>
            <td v-for="(val,key) in tableKeys"
                class="table-body-td table-td"
                :key="key">
              <div class="table-operating-list"
                   v-if="val.key">
                <span v-if="val.key && !val.type"
                      :title="scoped[val.key]"
                      :class="val.class?val.class(scoped):''">
                  {{scoped[val.key]}}
                </span>
                <span v-if="val.key && val.type"
                      :title="scoped[val.key] | typeMapFilter(val.type)"
                      :class="val.class?val.class(scoped):''">
                  {{scoped[val.key] | typeMapFilter(val.type)}}
                </span>
              </div>
              <div class="table-operating-list"
                   v-if="val.controls">
                  <span v-for="(td,key) in val.controls"
                        :key="key"
                        v-if="typeof td.show==='boolean'?td.show:btnPremiss[td.show]"
                        :class="td.class(scoped)"
                        class="table-operating-btn"
                        :title="td.text()"
                        @click="td.onClick(scoped)">
                    {{td.text(scoped)}}
                  </span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="no-data"
           v-if="!tableData.length && loaded">
        没有数据
      </div>
      <div class="loading-data clear"
           v-if="!loaded">
        <span class="loading-text pull-left">数据加载中...</span>
      </div>
      <div class="pager-panel clear"
           v-if="loaded && tableData.length">
        <div class="record pull-left">
          共有{{code}}
        </div>
        <div class="pull-right">
          <paging :total="total"
                  @page-change='pageChange'
                  :currentPage="currentPage">
          </paging>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import paging from './Paging.vue'
  export default {
    name: 'tableView',
    data () {
      return {
        checkedAll: false,
        checkedItem: new Array(10).fill(false)
      }
    },
    props: {
      tableData: {
        type: Array
      },
      total: Number,
      searched: Boolean,
      loaded: Boolean,
      checked: Boolean,
      tableKeys: Object,
      btnPremiss: Object,
      currentPage: Number,
      code: String
    },
    components: {
      paging
    },
    watch: {
      loaded (newVal) {
        if (newVal === false) {
          this.checkedItem = new Array(10).fill(false)
          this.checkedAll = false
        }
      }
    },
    methods: {
      selectChange (val) {
        let selectData = []
        if (this.checked) {
          this.checkedItem.forEach((val, key) => {
            if (val === true && this.tableData[key]) {
              selectData.push(this.tableData[key])
            }
          })
          this.$emit('select-change', selectData)
        }
      },
      selectAll () {
        this.checkedItem = new Array(10).fill(this.checkedAll)
        this.selectChange()
      },
      pageChange (page) {
        this.$emit('page-change', page)
      },
      handleCheckedCitiesChange () {
        this.checkedAll = false
        this.selectChange()
      }
    }
  }
</script>

<style lang="scss" type="text/scss" >
  .table-view {
    margin-top: 20px;
    .record {
      color: #666;
    }
    .table-content {
      overflow: auto;
      table{
        width: 100%;
      }
    }
    .table-container {
      background: #fff;
      overflow-x: auto;
      border: 1px solid #DADADA;
      .table-operating-list {
        white-space: nowrap;
      }
      .pager-panel {
        padding: 20px;
      }
      .loading-data {
        padding: 10px 15px;
        .loading-text {
          line-height: 48px;
          padding-left: 7px;
        }
      }
      .no-data {
        padding: 10px 15px;
      }
      .table-td {
        font-size: 14px;
        text-align: center;
        font-weight: normal;
        background: #fff;
        border-bottom: 1px solid #DADADA;
        padding: 0 10px;
      }
      .table-header-td {
        background: rgba(252, 252, 252, 1);
        color: rgba(103, 103, 103, 1);
        height: 40px;
        padding: 0;
      }
      .table-body-td {
        color: #333333;
        height: 50px;
      }
      .table-operating-btn {
        font-size: 14px;
        text-decoration: underline;
        border-right: 1px solid #B2C6E1;
        padding: 0 10px;
        cursor: pointer;
      }
      .table-operating-btn-type1 {
        color: #2793E7;
        &:hover {
          color: #2793E7*0.9;
        }
      }
      .table-operating-btn-type2 {
        color: #EB435F;
        &:hover {
          color: #EB435F*0.9;
        }
      }
      .table-operating-list .table-operating-btn:last-child {
        border: none;
      }
    }
  }

</style>
