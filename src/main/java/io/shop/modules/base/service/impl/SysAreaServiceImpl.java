package io.shop.modules.base.service.impl;

import io.shop.common.utils.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import io.shop.modules.base.dao.SysAreaDao;
import io.shop.modules.base.entity.SysAreaEntity;
import io.shop.modules.base.service.SysAreaService;



@Service("sysAreaService")
public class SysAreaServiceImpl implements SysAreaService {
	@Autowired
	private SysAreaDao sysAreaDao;
	
	@Override
	public SysAreaEntity queryObject(Long areaId){
		return sysAreaDao.queryObject(areaId);
	}
	@Override
	public List<SysAreaEntity> queryList(String areaCode){
		Query query=new Query();
		query.put("parentCode", areaCode);
		List<SysAreaEntity> areas = sysAreaDao.queryList(query);
		for(SysAreaEntity area : areas) {
			area.checkParent();
		}
		return areas;
	}
	@Override
	public List<SysAreaEntity> queryList(Map<String, Object> map){
		return sysAreaDao.queryList(map);
	}
	
	@Override
	public int queryTotal(Map<String, Object> map){
		return sysAreaDao.queryTotal(map);
	}
	
	@Override
	public void save(SysAreaEntity sysArea){
		sysAreaDao.save(sysArea);
	}
	
	@Override
	public void update(SysAreaEntity sysArea){
		sysAreaDao.update(sysArea);
	}
	
	@Override
	public void delete(Long areaId){
		sysAreaDao.delete(areaId);
	}
	
	@Override
	public void deleteBatch(Long[] areaIds){
		sysAreaDao.deleteBatch(areaIds);
	}
	
}
