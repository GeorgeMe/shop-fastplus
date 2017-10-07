package io.shop.modules.base.service;

import io.shop.modules.base.entity.SysMacroEntity;

import java.util.List;
import java.util.Map;

/**
 * 通用字典表
 * 
 * @author George
 * @email 2374252444@qq.com
 * @date 2017-10-05 00:42:17
 */
public interface SysMacroService {
	
	SysMacroEntity queryObject(Long macroId);
	
	List<SysMacroEntity> queryList(Map<String, Object> map);
	
	int queryTotal(Map<String, Object> map);
	
	void save(SysMacroEntity sysMacro);
	
	void update(SysMacroEntity sysMacro);
	
	void delete(Long macroId);
	
	void deleteBatch(Long[] macroIds);
}
