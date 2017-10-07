package io.shop.modules.base.service;

import io.shop.modules.base.entity.SysAreaEntity;

import java.util.List;
import java.util.Map;

/**
 * 行政区划
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
public interface SysAreaService {
	
	SysAreaEntity queryObject(Long areaId);

	List<SysAreaEntity> queryList(String areaCode);

	List<SysAreaEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysAreaEntity sysArea);
	
	void update(SysAreaEntity sysArea);
	
	void delete(Long areaId);
	
	void deleteBatch(Long[] areaIds);
}
