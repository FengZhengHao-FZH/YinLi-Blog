package com.example.blog.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class ProfileDto implements Serializable {

    @NotBlank(message = "名称不能为空")
    private String name;

    @NotBlank(message = "头像路径不能为空")
    private String avatar;
}
