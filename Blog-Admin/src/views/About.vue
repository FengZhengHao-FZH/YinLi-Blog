<template>
  <div>
    <div class="text-center">
      <div class="center">
        <vs-avatar :size=size circle>
          <img
            :src="profileForm.avatar"
            size="300" home="true" >
        </vs-avatar>
      </div>
      <h1>{{ profileForm.name }}</h1>

      <el-tabs type="border-card" style="margin-left: 20%; width: 60%;">
        <br>
        <br>
        <el-tab-pane label="Change My Profile">
          <div class="con-form">
            <vs-input v-model="profileForm.name" label="Name" placeholder="Please input the Name">
            </vs-input>
            <vs-input v-model="profileForm.avatar" label="Avatar" placeholder="Please input the avatar">
            </vs-input>
            <vs-button-group>
              <vs-button flat @click="changeInfo">
                Confirm
              </vs-button>
              <vs-button flat @click="resetProfileForm">
                Reset
              </vs-button>
            </vs-button-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Change My Password">
          <div class="con-form">
            <vs-input type="password" v-model="pwdForm.password" label="Current password" placeholder="Please input the password">
              <template #icon>
                <i class='bx bx-lock-open-alt'></i>
              </template>
            </vs-input>
            <vs-input type="password" v-model="pwdForm.newPassword" label="New password" placeholder="Please input a new password">
              <template #icon>
                <i class='bx bx-lock-open-alt'></i>
              </template>
            </vs-input>
            <vs-input type="password" v-model="rePassword" label="Confirm password" placeholder="Please input the password again">
              <template #icon>
                <i class='bx bx-lock-open-alt'></i>
              </template>
            </vs-input>
            <vs-button-group>
              <vs-button flat @click="changePwd">
                Confirm
              </vs-button>
              <vs-button flat @click="resetPwdForm">
                Reset
              </vs-button>
            </vs-button-group>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

export default {
  name: 'About',
  components: {
  },
  data () {
    return {
      size: '300',
      profileForm: {
        avatar: '',
        name: ''
      },
      pwdForm: {
        password: '',
        newPassword: ''
      },
      rePassword: ''
    }
  },
  created () {
    this.profileForm.name = this.$store.getters.getUserInfo.name
    this.profileForm.avatar = this.$store.getters.getUserInfo.avatar
  },
  methods: {
    resetProfileForm () {
      this.profileForm.name = this.$store.getters.getUserInfo.name
      this.profileForm.avatar = this.$store.getters.getUserInfo.avatar
    },
    resetPwdForm () {
      this.pwdForm.password = ''
      this.pwdForm.newPassword = ''
      this.rePassword = ''
    },
    changeInfo () {
      if (this.profileForm.name === '' || this.profileForm.avatar === '') {
        this.$vs.notification({
          title: 'Operation Fail',
          text: 'Please input the form'
        })
        return
      }
      this.changeProfile(this.pwdForm).then(function () {
        console.log('ok')
      })
    },
    changePwd () {
      if (this.pwdForm.password === '' || this.pwdForm.newPassword === '' || this.rePassword === '') {
        this.$vs.notification({
          title: 'Operation Fail',
          text: 'Please input the form'
        })
        return
      }
      if (this.rePassword !== this.pwdForm.newPassword) {
        this.$vs.notification({
          title: 'Operation Fail',
          text: 'The entered passwords are inconsistent'
        })
        return
      }
      this.changePassword(this.pwdForm).then(function () {
        console.log('ok')
      })
    }
  }
}
</script>

<style lang="stylus">
getColor(vsColor, alpha = 1)
unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
unquote("var(--vs-"+var+")")
.not-margin
  margin 0px
  font-weight normal
  padding 10px
.con-form
  width 100%
  .flex
    display flex
    align-items center
    justify-content space-between
    a
      font-size .8rem
      opacity .7
      &:hover
        opacity 1
  .vs-checkbox-label
    font-size .8rem
  .vs-input-content
    margin-left 20%
    margin-bottom 20px
    width calc(100%)
    .vs-input
      width 60%
.footer-dialog
  display flex
  align-items center
  justify-content center
  flex-direction column
  width calc(100%)
  .new
    margin 0px
    margin-top 20px
    padding: 0px
    font-size .7rem
    a
      color getColor('primary') !important
      margin-left 6px
      &:hover
        text-decoration underline
  .vs-button
    margin 0px
</style>
