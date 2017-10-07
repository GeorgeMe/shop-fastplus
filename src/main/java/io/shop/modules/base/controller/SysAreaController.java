package io.shop.modules.base.controller;

import io.shop.common.utils.R;
import io.shop.modules.base.entity.SysAreaEntity;
import io.shop.modules.base.service.SysAreaService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;




/**
 * 行政区划
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
@RestController
@RequestMapping("/sys/area")
public class SysAreaController {
	@Autowired
	private SysAreaService sysAreaService;
	
	/**
	 * 列表
	 */
	@RequestMapping("/list")
	@RequiresPermissions("sys:area:list")
	public R list(@RequestBody Map<String, Object> params){
		//查询列表数据
		List<SysAreaEntity> sysAreaList = sysAreaService.queryList(params);
		return R.ok().put("rows",sysAreaList);
	}
	/**
	 * 根据父级code查询子节点，树形目录
	 * @return
	 */
	@RequestMapping("/select")
	public List<SysAreaEntity> select(@RequestParam String areaCode) {
		System.out.println("C0000: "+areaCode);
		return sysAreaService.queryList(areaCode);
	}
	
	/**
	 * 信息
	 */
	@RequestMapping("/info/{areaId}")
	public R info(@PathVariable("areaId") Long areaId){
		SysAreaEntity sysArea = sysAreaService.queryObject(areaId);
		
		return R.ok().put("sysArea", sysArea);
	}
	
	/**
	 * 保存
	 */
	@RequestMapping("/save")
	@RequiresPermissions("sys:area:save")
	public R save(@RequestBody SysAreaEntity sysArea){
		sysAreaService.save(sysArea);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@RequestMapping("/update")
	@RequiresPermissions("sys:area:update")
	public R update(@RequestBody SysAreaEntity sysArea){
		sysAreaService.update(sysArea);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@RequestMapping("/delete")
	@RequiresPermissions("sys:area:delete")
	public R delete(@RequestBody Long[] areaIds){
		sysAreaService.deleteBatch(areaIds);
		
		return R.ok();
	}
	
}
