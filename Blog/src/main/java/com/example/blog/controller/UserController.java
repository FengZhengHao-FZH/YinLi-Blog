package com.example.blog.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.secure.SaSecureUtil;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import cn.dev33.satoken.util.SaTokenConsts;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.blog.dto.LoginDto;
import com.example.blog.dto.PasswordDto;
import com.example.blog.dto.ProfileDto;
import com.example.blog.entity.User;
import com.example.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Fengzhenghao
 * @since 2022-06-09
 */
@RestController
public class UserController {

    private final String SALT = "`~!@#$%^&*()_+-=123qwq";

    @Autowired
    private UserService userService;

    // 登录
    @RequestMapping ("/login")
    public SaResult login(@Validated @RequestBody LoginDto loginDto, @NotNull HttpServletResponse response){
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();
        String remember = loginDto.getRemember();
        User user = userService.getOne(new QueryWrapper<User>()
                .eq("username",username)
                .eq("password", SaSecureUtil.md5(password+ SALT))
        );
        if(user == null){
            return SaResult.error("Wrong username or password");
        }
        if(remember == null){
            StpUtil.login(user.getId(),false);
        }
        else {
            StpUtil.login(user.getId());
        }
        response.setHeader("Authorization", StpUtil.getTokenValue());
        response.setHeader("Access-control-Expose-Headers", "Authorization");
        return SaResult.data(user);
    }

    // 修改密码
    @SaCheckLogin
    @RequestMapping("/changePassword")
    public SaResult changePassword(@Validated @RequestBody PasswordDto passwordDto){
        User user = userService.getById(StpUtil.getLoginIdAsLong());
        if(user == null){
            return SaResult.error("Couldn't get your Info");
        }
        if(!user.getPassword().equals(SaSecureUtil.md5(passwordDto.getPassword() + SALT))){
            return SaResult.error("Wrong password");
        }
        user.setPassword(SaSecureUtil.md5(passwordDto.getNewPassword() + SALT));
        if (!userService.saveOrUpdate(user)) {
            return SaResult.error("Change Fail");
        }
        return SaResult.ok("Change Success");
    }

    // 修改个人信息
    @SaCheckLogin
    @RequestMapping("/changeProfile")
    public SaResult changeProfile(@Validated @RequestBody ProfileDto profileDto){
        User user = userService.getById(StpUtil.getLoginIdAsLong());
        if(user == null){
            return SaResult.error("Couldn't get your Info");
        }
        user.setName(profileDto.getName());
        user.setAvatar(profileDto.getAvatar());
        if (!userService.saveOrUpdate(user)) {
            return SaResult.error("Change Fail");
        }
        return SaResult.ok("Change Success");
    }

    // 查询登录状态
    @RequestMapping("isLogin")
    public SaResult isLogin() {
        return SaResult.ok("是否登录：" + StpUtil.isLogin());
    }

    // 查询 Token 信息
    @RequestMapping("tokenInfo")
    public SaResult tokenInfo() {
        return SaResult.data(StpUtil.getTokenInfo());
    }

    // 注销
    @RequestMapping("logout")
    public SaResult logout() {
        StpUtil.logout();
        return SaResult.ok();
    }
}
