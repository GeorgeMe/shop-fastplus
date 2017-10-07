package io.shop.modules.base.controller;

import io.shop.common.utils.R;
import io.shop.modules.base.entity.SysMacroEntity;
import io.shop.modules.base.service.SysMacroService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;




/**
 * 通用字典表
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
@RestController
@RequestMapping("/sys/macro")
public class SysMacroController {
	@Autowired
	private SysMacroService sysMacroService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:macro:list")
	public List<SysMacroEntity> list(){

		List<SysMacroEntity> sysMacroList = sysMacroService.queryList(new HashMap<>());

		return sysMacroList;
	}
	
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{macroId}")
	@RequiresPermissions("sys:macro:info")
	public R info(@PathVariable("macroId") Long macroId){
		SysMacroEntity sysMacro = sysMacroService.queryObject(macroId);
		
		return R.ok().put("sysMacro", sysMacro);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:macro:save")
	public R save(@RequestBody SysMacroEntity sysMacro){
		sysMacroService.save(sysMacro);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:macro:update")
	public R update(@RequestBody SysMacroEntity sysMacro){
		sysMacroService.update(sysMacro);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:macro:delete")
	public R delete(@RequestBody Long[] macroIds){
		sysMacroService.deleteBatch(macroIds);
		
		return R.ok();
	}
	
}
