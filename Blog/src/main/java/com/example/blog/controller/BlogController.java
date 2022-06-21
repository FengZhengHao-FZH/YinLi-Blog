package com.example.blog.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.util.SaResult;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.blog.entity.Blog;
import com.example.blog.entity.User;
import com.example.blog.service.BlogService;
import com.example.blog.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
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
public class BlogController {

    @Autowired
    BlogService blogService;

    @Autowired
    UserService userService;

    @RequestMapping ("/blogs")
    public SaResult list() {
        List<Blog> data = blogService.list(new QueryWrapper<Blog>().orderByDesc("date"));
        if(data == null){
            return SaResult.error("Error to find blogs");
        }
        return SaResult.data(data);
    }

    @RequestMapping("/blogs/{authorName}")
    public SaResult getBlogsByAuthor(@PathVariable(name = "authorName") String authorName){
        List<Blog> data = blogService.list(new QueryWrapper<Blog>().eq("author_name",authorName).orderByDesc("date"));
        if(data == null){
            return SaResult.error("Error to find blogs wrote by "+ authorName);
        }
        return SaResult.data(data);
    }

    @RequestMapping("/blog/{id}")
    public SaResult detail(@PathVariable(name = "id") Long id) {
        Blog blog = blogService.getById(id);
        if(blog==null){
            return SaResult.error("Blog was taken by aliens");
        }
        return SaResult.data(blog);
    }

    @SaCheckLogin
    @RequestMapping("/blog/edit")
    public SaResult edit(@Validated @RequestBody Blog blog){
        Blog temp;
        // 判断是新的博客还是旧的博客
        if(blog.getId() != null){
            temp = blogService.getById(blog.getId());
            if(temp.getAuthorId() != StpUtil.getLoginIdAsLong()){
                return SaResult.error("No permission");
            }
        }
        else {
            temp = new Blog();
            User user = userService.getById(StpUtil.getLoginIdAsLong());
            temp.setAuthorId(user.getId());
            temp.setAuthorName(user.getName());
            temp.setAuthorAvatar(user.getAvatar());
            temp.setDate(LocalDateTime.now());
            temp.setStatus((byte) 0);
        }
        // 属性复制
        BeanUtils.copyProperties(blog, temp, "id", "authorId","authorName","authorAvatar","date", "status");
        if(!blogService.saveOrUpdate(temp)){
            return SaResult.error("Update or Add fail");
        }
        return SaResult.ok();
    }
}
