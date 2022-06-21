package com.example.blog.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

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
@TableName("user")
public class User implements Serializable {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    private String name;
    private String avatar;
    private String about;
    private String username;
    private String password;
    private byte status;
}
