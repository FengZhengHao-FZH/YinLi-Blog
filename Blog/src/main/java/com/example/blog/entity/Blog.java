package com.example.blog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 *
 * </p>
 *
 * @author Fengzhenghao
 * @since 2022-06-09
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Repository
@TableName("blog")
public class Blog implements Serializable {

    @TableId(value="id",type = IdType.AUTO)
    private Long id;
    private Long authorId;
    private String authorName;
    private String authorAvatar;
    private String title;
    private String cover;
    private String des;
    private String content;
    private String tag;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDateTime date;
    private byte status;

}
